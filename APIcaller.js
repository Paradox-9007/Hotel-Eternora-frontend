import {
  getBookingsData,
  getClientData,
} from "/shared/services/dataService.js";

const fetchClientRequest = () => getClientData();
const fetchBookingsRequest = () => getBookingsData();

export { fetchBookingsRequest, fetchClientRequest };
