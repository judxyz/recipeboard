
import axios from "axios";

export async function recipePreview(url) {
    const { data } = await axios.get("https://api.linkpreview.net", {
      params: { key: process.env.LINKPREVIEW_API_KEY, q: url }
    })
    console.log(data)
    return {
      title: data.title || new URL(url).hostname,
      description: data.description || "",
      imageUrl: data.image || "",
      source: new URL(url).hostname.replace("www.", "")

    }
}

