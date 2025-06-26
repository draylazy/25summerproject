import axios from "axios";

const API_URL = "http://localhost:8080/api/bookings";

export const createBooking = (booking) =>
  axios.post(`${API_URL}/create`, booking);

export const getBookings = () =>
  axios.get(`${API_URL}/all`);

export const deleteBooking = (id) =>
  axios.delete(`${API_URL}/delete/${id}`);

export const updateBooking = (id, updatedBooking) =>
  axios.put(`${API_URL}/update/${id}`, updatedBooking);
