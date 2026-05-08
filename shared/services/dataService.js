const DATASET_PATHS = Object.freeze({
  bookings: "/data-source/get_bookings_request.json",
  clients: "/data-source/get_client_request.json",
});

const datasetCache = new Map();

async function loadDataset(datasetName) {
  if (!DATASET_PATHS[datasetName]) {
    throw new Error(`Unknown dataset "${datasetName}"`);
  }

  if (!datasetCache.has(datasetName)) {
    datasetCache.set(
      datasetName,
      fetch(DATASET_PATHS[datasetName], {
        cache: "force-cache",
      }).then(async (response) => {
        if (!response.ok) {
          throw new Error(
            `Unable to load ${datasetName} data (${response.status})`
          );
        }

        const payload = await response.json();

        if (!Array.isArray(payload)) {
          throw new Error(`${datasetName} data is not a JSON array`);
        }

        return payload;
      })
    );
  }

  return datasetCache.get(datasetName);
}

function clearDatasetCache(datasetName = null) {
  if (datasetName) {
    datasetCache.delete(datasetName);
    return;
  }

  datasetCache.clear();
}

const getBookingsData = () => loadDataset("bookings");
const getClientData = () => loadDataset("clients");

export {
  DATASET_PATHS,
  clearDatasetCache,
  getBookingsData,
  getClientData,
};
