const API_BASE_URL = "http://localhost:3000/api";

export async function fetchModel(url) {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Lỗi mạng: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Lỗi khi fetch dữ liệu:", error);
    return null;
  }
}
