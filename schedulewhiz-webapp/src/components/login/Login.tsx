const Login = () => {

  const svgCode = `<svg width="695" height="1024" viewBox="0 0 695 1024" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M695 0V1024H75.9997C75.9997 1024 -121.5 206 122 476C365.5 746 695 0 695 0Z" fill="#EBB200"/></svg>`;

  const encodedSvg = btoa(svgCode);

  const svgBackground = {
    background: `url("data:image/svg+xml;base64,${encodedSvg}")`,
    backgroundColor: 'black',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    backgroundSize: 'contain',
    height: '100vh', 
  };

  return (
    <div style={svgBackground} >
    
    </div>
  );
}

export default Login;
