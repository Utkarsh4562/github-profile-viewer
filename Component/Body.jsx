import {useEffect, useState} from "react"

function Body(){ // we have to just display cards of github user's photo 
    const [Profile, setProfile] = useState([]); // we have to just display information of user profile in ui in the form of array and initionaly useState array is empty 
    const [showScrollButton, setShowScrollButton] = useState(false); // ✅ Added state for scroll button visibility
    const [numberOfProfile,setnumberOfProfile] = useState("");
    async function generateProfile(count){ // it will just fetch the information of user's profile in the form of api we will use asyn await and then we will send count
        // const response = await fetch("https://api.github.com/users?per_page=10"); // response is promise and and fetch will wait untill all these information fetched we won't move
        const ran = Math.floor(1+Math.random()*10000);
         const response = await fetch(`https://api.github.com/users?since=${ran}&per_page=${count}`); // ran for random user
        const data = await response.json(); // if we get all information so convert it in json we also required await because it takes times for conversion 
        setProfile(data); // call setProfile and if we get data so push the data into profile 
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // NEW: Add this function
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    useEffect(() => {
        generateProfile(10);
        // NEW: Add these lines
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []) // and then we call generateProfile and we put it inside useEffect so it calls only once 

    return ( // now we have to just create card of user's profile if i click it so it just open in github
        <div className="but">
            <input type="text" className="inpu" placeholder="Search here" value={numberOfProfile} onChange={(e)=>setnumberOfProfile(e.target.value)}></input>{/* just a input tag where we put our desirred number and then search if i write 40 inside value so in placeholder 40 will print so thats why we wrote no.of profile*/}  
            <button onClick={()=>generateProfile(Number(numberOfProfile))}>Search Profile</button>{/* this is a button where we search*/}
            
            <div className="profile">
                {
                    Profile.map((value) => ( // it will just return an array
                        <div key={value.id} className="cards">{/* we need to give key for child component*/}
                            <img src={value.avatar_url} alt="avatar"></img>{/*it will show user image in ui*/}
                            <h2>{value.login}</h2> {/* it will just show user name*/}
                            <a href={value.html_url} target="_blank" rel="noopener noreferrer">Profile</a> {/* we will just use anchor that take us on github profile and we use target black so it opens in new page */}
                        </div>
                    ))
                }
            </div>

            {/* NEW: Add this button */}
            <button 
                className={`scroll-to-top ${showScrollButton ? 'show' : ''}`}
                onClick={scrollToTop}
            >
                ↑
            </button>
        </div>
    )
}

export default Body;

