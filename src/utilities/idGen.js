export default function generateID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    
    let randomID = chars.charAt(Math.floor(Math.random() * chars.length)); 
    
    // Generate 12 random digits
    for (let i = 0; i < 12; i++) {
        randomID += Math.floor(Math.random() * 10);
    }
    
    return randomID;
}