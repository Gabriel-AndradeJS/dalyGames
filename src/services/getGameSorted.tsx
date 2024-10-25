

export default async function getGameSorted() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/next-api/?api=game_day`, { cache: 'no-store' });
        return response.json();
    }catch (error) {
        throw new Error('Failed to fetch data');
    }
}