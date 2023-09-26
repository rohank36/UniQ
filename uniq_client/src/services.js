import axios from "axios";

const API_URL = "http://localhost:3001/api";

export async function getProf(code) {
  try {
    const response = await axios.post(
      `${API_URL}/profs/login`,
      {
        accessCode: code,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error("Error in Axios Query", e);
  }
}

export async function startOH(code, started) {
  try {
    const response = await axios.put(
      `${API_URL}/profs/startOH`,
      {
        accessCode: code,
        start: started,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error("Error in Axios Query", e);
  }
}

export async function dequeue(accessCode) {
  try {
    const response = await axios.put(
      `${API_URL}/profs/dequeue`,
      {
        accessCode: accessCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error("Error in Axios Query", e);
  }
}

export async function joinQueue(joinCode, studName) {
  try {
    const response = await axios.post(
      `${API_URL}/studs/joinQueue`,
      {
        name: studName,
        joinCode: joinCode,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error("Error in Axios Query", e);
  }
}

export async function leaveQueue(studName) {
  try {
    const response = await axios.post(
      `${API_URL}/studs/leaveQueue`,
      {
        name: studName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e) {
    throw new Error("Error in Axios Query", e);
  }
}
