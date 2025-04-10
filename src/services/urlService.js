const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/urls`;

// Create a new shortened URL
const createUrl = async(urlData) => {
    try {
        const res = await fetch(`${BASE_URL}/shorten`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(urlData),
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Get all URLs for the logged-in user
const getUserUrls = async() => {
    try {
        const res = await fetch(`${BASE_URL}/my-urls`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Delete a URL
const deleteUrl = async(shortUrl) => {
    try {
        const res = await fetch(`${BASE_URL}/${shortUrl}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Add or update note for a URL
const updateNote = async(shortUrl, noteContent) => {
    try {
        const res = await fetch(`${BASE_URL}/${shortUrl}/note`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ content: noteContent }),
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

// Delete note from a URL
const deleteNote = async(shortUrl) => {
    try {
        const res = await fetch(`${BASE_URL}/${shortUrl}/note`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export { createUrl, getUserUrls, deleteUrl, updateNote, deleteNote };