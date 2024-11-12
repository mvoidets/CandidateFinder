// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
readonly id: number;
readonly name: string;
readonly location: string;
readonly avatar_url: string;
readonly email: string;
readonly html_url: string;
readonly company: string;
readonly status: string;
readonly bio: string;

}


export default Candidate;
