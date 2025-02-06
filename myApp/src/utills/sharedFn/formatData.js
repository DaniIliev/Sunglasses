export const  formatDate = () => {  
    let now = new Date();  
    let day = String(now.getDate()).padStart(2, '0');  
    let month = String(now.getMonth() + 1).padStart(2, '0');  
    let year = now.getFullYear();  

    let currentDateString = `${day}.${month}.${year}`;  

    return currentDateString
}  
