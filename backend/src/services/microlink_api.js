import axios from 'axios';

// const mql = require('@microlink/mql')
export async function get_meta(url) {

    const { data } = await axios.get(
        "https://api.microlink.io",
        { url, meta: true }
    );
    return {
        title: data.description || new URL(url).hostname,
        description: data.description || "",
        imageUrl: data.image || "",
        source: new URL(url).hostname.replace("www.", "")
    }

}