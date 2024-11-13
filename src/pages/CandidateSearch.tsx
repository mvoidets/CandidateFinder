import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';  

import type  Candidate from '../interfaces/Candidate.interface';


interface CandidateSearchProps {
 
  avatar: string;
  name: string;
  location: string;
  email: string;
  company: string;
  bio: string;
}

 const CandidateItem = ({ avatar, name, location, email, company, bio }: CandidateSearchProps) => (
  <section>
    <figure>
      <img 
      src={avatar || '/unknown_avatar.png'} 
      alt={`${name}'s avatar`} 
      width='100%' 
      height='25%' 
      />
    </figure>
    <article>
    <h2>{name || "NA"}</h2>
    <p>Location: {location|| "NA"}</p>
    <p>Email: {email|| "NA"}</p>
    <p>Company: {company|| "NA"}</p>
    <p>Bio: {bio|| "NA"}</p>
    </article>
  </section>
);

//function for adding candidate to saved candidates
const addCandidate = (candidate: Candidate) => {
  const storedCandidate = localStorage.getItem('candidate');
  let parsedCandidate: Candidate[] = [];
  if (storedCandidate) {
    parsedCandidate = JSON.parse(storedCandidate);
  }
  parsedCandidate.push(candidate);
  localStorage.setItem('candidate', JSON.stringify(parsedCandidate));
}

const CandidateSearch = () => {
  const [getHubData, setGithubData] = useState([]);
  const [index, setIndex] = useState(0);
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    searchGithub().then((data) => setGithubData(data));
  }
  , []);

  useEffect(() => {
    if (getHubData.length) {
      searchGithubUser(getHubData[index].login).then((data) => setCandidate(data));
    }
  }
  , [index
  , getHubData]);
  
  console.log(candidate);

 


useEffect(() => {
  const storedCandidates = localStorage.getItem('candidate');
  if (storedCandidates) {
    const parsedCandidates: Candidate[] = JSON.parse(storedCandidates);
    if (parsedCandidates.length > 0) {
      setCandidate(parsedCandidates[0]);
    }
  }
}, []);

  return (
    <div>
      <h1>CandidateSearch</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}></div>
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '20px', width: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
       
           
      {candidate && (
        <section>
          <CandidateItem
            name={candidate.name}
            location={candidate.location}
            email={candidate.email}
            company={candidate.company}
            bio={candidate.bio}
            avatar={candidate.avatar_url}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <button
              style={{
                backgroundColor: 'red',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onClick={() => setIndex((prev) => prev + 1)}
            >
              <span style={{ color: 'white', fontSize: '24px' }}>-</span>
            </button>

            <button
              onClick={() => {
                if (candidate) {
                  addCandidate(candidate);
                }
              }}
              style={{
                backgroundColor: 'green',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: 'white', fontSize: '24px' }}>+</span>
            </button>
          </div>
        </section>
      )}
      
      </div>
  
   
    </div>
  );     
};
  
export default CandidateSearch ;



