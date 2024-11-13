import { useState, useEffect } from 'react';
import   Candidate from '../interfaces/Candidate.interface';


const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  // Load candidates from localStorage when the component mounts
  useEffect(() => {
    const savedCandidates = localStorage.getItem('candidate');
    if (candidates) {
      setCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  // Remove a candidate from the list and update localStorage
  const removeFromStorage = (id: number) => {
    // Filter out the candidate with the given id
    const newCandidates = candidates.filter(candidate => candidate.id !== id);
    
    // Update state and localStorage with the new list
    setCandidates(newCandidates);
    localStorage.setItem('candidate', JSON.stringify(newCandidates));
  };



return (
  <div>
    <h1>Potential Candidates</h1>
    <table className='table'>
      <thead>
        <tr>
          <th >Avatar</th>
          <th >Name</th>
          <th >Location</th>
          <th >Company</th>
          <th >Bio</th>
          <th> Reject</th>
        </tr>
      </thead>
      <tbody>
        {candidates.map((candidate, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'center' }}>
              <img src={candidate.avatar_url} style={{ width: '50px', height: '50px'}} />
            </td>
            <td >{candidate.name} </td>
            <td >{candidate.location}</td>
            <td >{candidate.company}</td>
            <td >{candidate.bio}</td>
            <td style={{ textAlign: 'center' }}>
          <button onClick={() => removeFromStorage(candidate.id)} style={{ backgroundColor: 'red', borderRadius: '50%', color: 'white', border: 'none', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <span style={{ fontSize: '20px', lineHeight: '20px' }}>−</span>
          </button>
            </td>
          </tr>
         
        ))}
      </tbody>
    </table>
  </div>
);
};

export default SavedCandidates;