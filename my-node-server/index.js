require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");

const port = process.env.PORT || 5000;
const app = express();

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tqv0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const eventsCollection = client.db("EventManagement").collection("events");

async function run() {
  try {
    // Generate jwt token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Create new event - without middleware
    app.post("/events", async (req, res) => {
      try {
        const {
          eventName,
          description,
          date,
          time,
          location,
          maxAttendees,
          category,
          isPublic,
        } = req.body;

        // Create event document
        const eventDocument = {
          eventName,
          description: description || "",
          date: new Date(date),
          time,
          location,
          maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
          category: category || "other",
          isPublic: isPublic || false,
          createdAt: new Date(),
          updatedAt: new Date(),
          attendees: [],
          status: "upcoming",
        };

        // Insert into database
        const result = await eventsCollection.insertOne(eventDocument);

        res.status(201).json({
          message: "Event created successfully",
          eventId: result.insertedId,
          event: eventDocument,
        });
      } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
          error: "Failed to create event",
          details: error.message,
        });
      }
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Event Management");
});

app.listen(port, () => {
  console.log(`Event Management is running on port ${port}`);
});