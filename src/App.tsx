import '@styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import { ChatContainer, Login } from './components';
import { useAppSelector } from './hooks/redux.hook';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

function App() {
  const credentials = useAppSelector((state) => state.credentials);

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    return () => window.removeEventListener('resize', appHeight);
  }, []);

  return (
    <div className="wrapper">
      {(credentials.credentials.apiTokenInstance === '' ||
        credentials.credentials.idInstance === '') && <Login />}
      {credentials.credentials.apiTokenInstance !== '' &&
        credentials.credentials.idInstance !== '' && <ChatContainer />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
