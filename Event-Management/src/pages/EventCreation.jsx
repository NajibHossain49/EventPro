import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Info } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const EventCreation = () => {
    const [formData, setFormData] = useState({
        eventName: '',
        description: '',
        date: '',
        time: '',
        location: '',
        maxAttendees: '',
        category: 'social',
        isPublic: true
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/events`,
                formData
            );

            console.log("Event created successfully:", response.data);
            toast.success("Event created successfully!");

            // Reset the form
            setFormData({
                eventName: '',
                description: '',
                date: '',
                time: '',
                location: '',
                maxAttendees: '',
                category: 'social',
                isPublic: true
            });

        } catch (error) {
            if (error.response) {
                console.error("Error response:", error.response.data);
                toast.error(`Error: ${error.response.data.error || 'Failed to create event'}`);
            } else if (error.request) {
                console.error("No response from server:", error.request);
                toast.error("No response from the server. Please try again later.");
            } else {
                console.error("Error:", error.message);
                toast.error("An unexpected error occurred.");
            }
        }
    };



    return (
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Create New Event</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Event Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Event Name
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter event name"
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your event"
                    />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Date
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Time
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                        Location
                        <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter location"
                        />
                    </div>
                </div>

                {/* Max Attendees */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Maximum Attendees</label>
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="number"
                            name="maxAttendees"
                            value={formData.maxAttendees}
                            onChange={handleChange}
                            min="1"
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter maximum number of attendees"
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="social">Social</option>
                        <option value="business">Business</option>
                        <option value="education">Education</option>
                        <option value="sports">Sports</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Public/Private Toggle */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="text-sm font-medium text-gray-700">Make this event public</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                >
                    Create Event
                </button>
            </form>
        </div>
    );
};

export default EventCreation;