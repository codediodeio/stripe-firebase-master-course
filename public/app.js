document.addEventListener('DOMContentLoaded', function() {

  // Initialize
  let app = firebase.app();
  let features = ['auth', 'functions'].filter(
    feature => typeof app[feature] === 'function'
  );
  console.log(`Firebase SDK loaded with ${features.join(', ')}`);

  // Firebase Services
  const fun = firebase.functions();
  const auth = firebase.auth();

  // DOM Elements
  const loginBtn = document.getElementById('login');
  const logoutBtn = document.getElementById('logout');
  const profile = document.getElementById('profile');

  // Realtime listener for Auth State
  auth.onAuthStateChanged(user => {

    if (user) {
        profile.innerHTML = user.uid;
        loginBtn.style.visibility = 'hidden';
        logoutBtn.style.visibility = 'visible';
    } else {
        profile.innerHTML = 'not logged in';
        loginBtn.style.visibility = 'visible';
        logoutBtn.style.visibility = 'hidden';
    }
    
  });

  // Event Handlers

  loginBtn.onclick = () => auth.signInAnonymously();
  logoutBtn.onclick = () => auth.signOut();


  
  // Callable Functions
  const testFun = fun.httpsCallable('testFunction');
  const testFunButton = document.getElementById('testFunButton');

  document.getElementById('testFunButton').onclick = async () => {
    const response = await testFun({ message: 'Howdy!' });

    console.log(response);
  };
});
