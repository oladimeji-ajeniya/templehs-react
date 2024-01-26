import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';


function ContactsBody() {
    return (
        <div className="flex w-full bg-white">
          <div className="w-1/2 p-4 mx-16 mt-120">
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-7xl'>Select your doctor and appointment time</h1>
          </div>
    
          <div className="w-1/2 p-4">
          <>
            <ContactsHeader />
            <ContactsList />
          </>
          </div>
        </div>
      );
}


export default ContactsBody;
