export default function Loader({ isLoading }) {
  return isLoading ? <div className="loader" /> : null;
}
