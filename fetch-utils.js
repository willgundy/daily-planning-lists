const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiYnp4bXNrYWdwcm92cWNjcm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc1NTM0MzksImV4cCI6MTk2MzEyOTQzOX0.wkKK4FheZyrNrf7B04tLKfQuyVwpMO3ycPvoUWD6S9M';

const SUPABASE_URL = 'https://rbbzxmskagprovqccrmk.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getAllLists() {
    const response = await client 
        .from('planner-lists')
        .select('*');

    return response.body;
}

export async function getListById(listId) {
    const response = await client 
        .from('planner-lists')
        .select('*')
        .match({ 'list_id': listId })
        .single();

    return response.body;
}

export async function getActiveLists() {
    const response = await client 
        .from('planner-lists')
        .select('*')
        .match({ 'status': 'active' });

    return response.body;
}

export async function getCompletedLists() {
    const response = await client 
        .from('planner-lists')
        .select('*')
        .match({ 'status': 'complete' });

    return response.body;
}

export async function updateListToCompleted(listId) {
    const response = await client 
        .from('planner-lists')
        .update({ 'status': 'complete' })
        .match({ 'list_id': listId })
        .single();

    return response.body;
}

export async function createList(list){
    const response = await client
        .from('planner-lists')
        .insert(list);
    
    return response.body;
}


export async function getAllItems() {
    const response = await client 
        .from('planner-items')
        .select('*');

    return response.body;
}

export async function getItemById(itemId) {
    const response = await client 
        .from('planner-items')
        .select('*')
        .match({ 'item_id': itemId })
        .single();

    return response.body;
}

export async function getItemsByListId(listId) {
    const response = await client 
        .from('planner-items')
        .select('*')
        .match({ 'list_id': listId });

    return response.body;
}

export async function updateItemToComplete(itemId) {
    const response = await client 
        .from('planner-items')
        .update({ 'status': 'complete' })
        .match({ 'item_id': itemId })
        .single();

    return response.body;
}

export async function updateItemToActive(itemId) {
    const response = await client 
        .from('planner-items')
        .update({ 'status': 'active' })
        .match({ 'item_id': itemId })
        .single();

    return response.body;
}

export async function createItem(item){
    const response = await client
        .from('planner-items')
        .insert(item);
    
    return response.body;
}
