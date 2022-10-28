const init = () => {

    const listings = document.querySelectorAll('.-list-')
    
    listings.forEach(el => {
        
        const listingBtn = el.querySelector('.-list-show-')
        const listingHidden = el.querySelectorAll('.-list-el-hid-')
        
        listingBtn?.addEventListener('click', () => {
        
            for (let i = 0; i < listingHidden.length; i++) {
    
                listingHidden[i].classList.remove('-list-el-hid-')
                listingBtn.remove()
                
            }
            
        })
    
    })

}



export default { init }