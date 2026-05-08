import {ExcelDate_to_NormalDate,NormalDate_to_ExcelDate, convertEminutesToNormalminute} from './dateConverter.js';
import {fetchBookingsRequest,fetchClientRequest} from './APIcaller.js';

class JSONFilter {
    constructor(data) {
        this.data = data; // Store the JSON array
    }

    // Method to filter by a single condition (key, value)
    filterByKeyValue(key, value) {
        return this.data.filter(item => item[key] === value);
    }

    // Method to filter by multiple conditions (object with key-value pairs)
    filterByConditions(conditions) {
        return this.data.filter(item =>
            Object.entries(conditions).every(([key, value]) => item[key] === value)
        );
    }

    // Method to filter by a range of values for a specific key
    filterByRange(key, min, max) {
        return this.data.filter(item => {
            if (min === null) {
                return item[key] <= max;
            }
            if (max === null) {
                return item[key] >= min;
            }
            return item[key] >= min && item[key] <= max;
        });
    }

    // Method to filter first dataset to only include items with matching values in the second dataset
    findSimilarByKey(secondDataset, firstKey, secondKey = null) {
        const keyInSecondDataset = secondKey || firstKey;
        
        const secondDataValues = new Set();
        secondDataset.forEach(item => {
            if (item[keyInSecondDataset] !== undefined) {
                secondDataValues.add(item[keyInSecondDataset]);
            }
        });

        return this.data.filter(item => 
            item[firstKey] !== undefined && secondDataValues.has(item[firstKey])
        );
    }

    getUniqueByKey(key, aggregateFields = []) {
        const uniqueValues = new Map();
        
        this.data.forEach(item => {
            if (item[key] !== undefined) {
                // If this key already exists and we have fields to aggregate
                if (uniqueValues.has(item[key]) && Array.isArray(aggregateFields) && aggregateFields.length > 0) {
                    const existingItem = uniqueValues.get(item[key]);
                    
                    // Aggregate the specified fields
                    for (const field of aggregateFields) {
                        if (typeof item[field] === 'number' && typeof existingItem[field] === 'number') {
                            existingItem[field] += item[field];
                        }
                    }
                } else {
                    uniqueValues.set(item[key], {...item});
                }
            }
        });
        
        return Array.from(uniqueValues.values());
    }

    getUniqueTransformedValues(key, transformFn) {
        // Get unique objects by the key first
        const uniqueItems = this.getUniqueByKey(key);
        
        // Transform each unique value using the provided function
        const transformedValues = uniqueItems.map(item => {
            if (item[key] !== undefined) {
                return transformFn(item[key]);
            }
            return null;
        }).filter(value => value !== null);
        
        // Return unique transformed values
        return [...new Set(transformedValues)].sort();
    }

}




const BookingsData = await fetchBookingsRequest();
const ClientData = fetchClientRequest();



async function getAvailableBookingYears() {
    try {
        const bookingData = await fetchBookingsRequest();
        
        if (!Array.isArray(bookingData) || bookingData.length === 0) {
            throw new Error("Invalid booking data structure");
        }
        
        const bookingFilter = new JSONFilter(bookingData);
        const keyName = bookingData[0].arrivalDay !== undefined ? 'arrivalDay' : 'Arrival Day';
        
        // Use the new method to get unique years
        const years = bookingFilter.getUniqueTransformedValues(
            keyName,
            (arrivalDay) => {
                const dateObj = ExcelDate_to_NormalDate(arrivalDay);
                return dateObj;
            }
        );
        
        return years;
    } catch (error) {
        console.error("Error getting available booking years:", error);
        throw error;
    }
}


getAvailableBookingYears();     





export default JSONFilter;




// // Example usage: // //

// const clientData = new JSONFilter(fetchClientRequest());
// const bookingData = new JSONFilter(fetchBookingRequest());


// const filteredByName = jsonFilter.filterByKeyValue( key  , value );
// const filteredByName = jsonFilter.filterByKeyValue('name', 'John');
// retrun everything with name John


// const filteredByConditions = jsonFilter.filterByConditions({ key : value , key: value });
// const filteredByConditions = jsonFilter.filterByConditions({ name: 'Jane', age: 30 });
// retrun everything with name John and age 30


// const filteredByRange = jsonFilter.filterByRange( key , min, max);
// const filteredByRange = jsonFilter.filterByRange('age', 20, 30);
// return everything with age between 20 and 30

// const filteredByRange = jsonFilter.filterByRange( key , min  , max);
// const filteredByRange = jsonFilter.filterByRange('age', null , 30);
// return everything with age less then 30 and equal 30

// const filteredByRange = jsonFilter.filterByRange( key , min  , max);
// const filteredByRange = jsonFilter.filterByRange('age', 20   , null);
// return everything with age more than 20  and equal 20



// const customers = bookingData.findSimilarByKey(clientData, "Guest ID", "Client ID");
// const customers = bookingData.findSimilarByKey(clientData, "Guest ID", "Client ID");
// return bookingsData whose Guest ID match Client ID in clientData

// const uniqueBookings = bookingData.getUniqueByKey( key , aggregateFields = [] );
// const uniqueBookings = bookingData.getUniqueByKey('unitID', ['profit', 'durationOfStay']);
// return unique bookings by unitID and sum up profit and duration of stay
