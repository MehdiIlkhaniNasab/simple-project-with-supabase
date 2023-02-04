const { createClient } = supabase
const supabaseUrl = 'https://hhewlyrcqyamaoafzwhr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZXdseXJjcXlhbWFvYWZ6d2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0OTY2MTEsImV4cCI6MTk5MTA3MjYxMX0.llUNeTKvdPDdRhFj-aUh0ybuF4vgTRJAvuosrYq56hE'
const supabaseCon = createClient(supabaseUrl, supabaseKey)

export default supabaseCon