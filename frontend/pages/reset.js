import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <div>
        <p>Sorry, you must have a token</p>
        <Reset />
      </div>
    );
  }
  return (
    <div>
      <p>RESET PASSWORD {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
