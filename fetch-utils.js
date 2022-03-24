const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiYnp4bXNrYWdwcm92cWNjcm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTM0MzksImV4cCI6MTk2MzEyOTQzOX0.wkKK4FheZyrNrf7B04tLKfQuyVwpMO3ycPvoUWD6S9M';

const SUPABASE_URL = 'https://rbbzxmskagprovqccrmk.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getAllLists() {
    const response = await client 
        .from('f1_driver_standings')
        .select('*')
        .order('position');

    return response.body;
}

export async function getDriverDetails() {
    const response = await client 
        .from('f1_drivers')
        .select('*');

    return response.body;
}

export async function getSingleDriverDetail(driverId) {
    const response = await client 
        .from('f1_drivers')
        .select('*')
        .match({ 'driverId': driverId })
        .single();

    return response.body;
}