import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-gray-800">Lumea</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/profile" className="text-gray-600 hover:text-pink-500">Profile</Link>
          <Link to="/logout" className="text-gray-600 hover:text-pink-500">Logout</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-white border-r p-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Conversations</h2>
            <div className="space-y-2">
              {['Alex Johnson', 'Sam Wilson', 'Taylor Swift', 'Jamie Smith'].map((name) => (
                <div key={name} className="flex items-center p-3 rounded-lg hover:bg-pink-50 cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-600 mr-3">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{name}</p>
                    <p className="text-sm text-gray-500">Last message...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b flex items-center">
            <div className="h-10 w-10 rounded-full bg-pink-200 flex items-center justify-center text-pink-600 mr-3">
              A
            </div>
            <div>
              <p className="font-medium">Alex Johnson</p>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {[
              { sender: 'them', text: 'Hey there! How are you doing?', time: '10:30 AM' },
              { sender: 'me', text: 'I\'m good, thanks! Just working on some projects.', time: '10:32 AM' },
              { sender: 'them', text: 'That sounds interesting. What kind of projects?', time: '10:33 AM' },
            ].map((msg, i) => (
              <div key={i} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${msg.sender === 'me' ? 'bg-pink-500 text-white' : 'bg-white border'}`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-pink-100' : 'text-gray-500'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="bg-white p-4 border-t">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button className="bg-pink-500 text-white px-4 py-2 rounded-r-lg hover:bg-pink-600">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomePage;