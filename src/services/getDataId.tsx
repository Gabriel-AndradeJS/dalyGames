export async function getDataId(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}
