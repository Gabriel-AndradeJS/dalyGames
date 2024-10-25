export async function getData(title: string | string[] | undefined) {
    try{   
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/next-api/?api=game&title=${title}`);
        return response.json();
    } catch (error) {
        return null;
    }
    
}