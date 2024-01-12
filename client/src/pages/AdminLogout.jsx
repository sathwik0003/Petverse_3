import SidebarAdmin from '../componants/Admin/SideBarAdmin';

const AdminLogout = () => {
 
  const logoutHandle=()=>{
    window.location.href='/'
  }

  return (
    <>
     <SidebarAdmin />
   
    <div style={{margin: '16rem 37rem',
    border: '1px solid black',
    padding: '2rem 2rem',
    borderRadius: '1rem'
    }}>
    <div style={{padding:'1rem'}}>
      Are you sure you want to logout?
    </div>
    <div style={{display:'flex',alignItems:'center',margin: '1rem 4rem'}}>
   
      <button onClick={logoutHandle}>Logout</button>
      </div>

      </div>
    
    </>
  );
};

export default AdminLogout;