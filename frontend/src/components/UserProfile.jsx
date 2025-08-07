import { useState } from 'react';

const UserProfile = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [resume, setResume] = useState(null);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    experience: '3-5 years',
    skills: ['Java', 'React', 'Spring Boot']
  });

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const addSkill = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, e.target.value]
      }));
      e.target.value = '';
    }
  };

  const removeSkill = (index) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}>
      <div className={`rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
            My Profile
          </h3>
        </div>

        <div className="border-b mb-6">
          <nav className={`flex space-x-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {['Profile', 'Resume', 'Applications'].map((tab) => {
              const tabKey = tab.toLowerCase();
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`py-4 px-1 font-medium text-sm border-b-2 ${
                    activeTab === tabKey
                      ? darkMode
                        ? 'border-green-500 text-white'
                        : 'border-green-500 text-black'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {activeTab === 'profile' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="h-32 w-32 rounded-full object-cover"
                />
                <button className={`absolute bottom-0 right-0 p-2 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  ✏️
                </button>
              </div>
              <h4 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                {profile.name}
              </h4>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                {profile.experience} experience
              </p>
            </div>

            <div>
              <div className="mb-4">
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
              </div>

              <div className="mb-4">
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Experience
                </label>
                <select
                  name="experience"
                  value={profile.experience}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                >
                  <option value="0-2 years">0-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div className="mb-4">
                <label className={`block mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Skills
                </label>
                <div className={`flex flex-wrap gap-2 mb-2 p-2 rounded-lg ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`flex items-center px-3 py-1 rounded-full text-sm ${
                        darkMode
                          ? 'bg-gray-600 text-white'
                          : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-xs"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add skill and press Enter"
                  onKeyDown={addSkill}
                  className={`w-full p-3 rounded-lg border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-black'
                  }`}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'resume' && (
          <div>
            <div className={`mb-6 p-8 border-2 border-dashed rounded-lg text-center ${
              darkMode
                ? 'border-gray-600 bg-gray-700'
                : 'border-gray-300 bg-gray-50'
            }`}>
              {resume ? (
                <div>
                  <p className={darkMode ? 'text-white' : 'text-black'}>
                    {resume.name}
                  </p>
                  <button
                    onClick={() => setResume(null)}
                    className={`mt-2 px-4 py-2 rounded ${
                      darkMode
                        ? 'bg-red-600 hover:bg-red-700 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Drag & drop your resume here or click to browse
                  </p>
                  <input
                    type="file"
                    id="resume-upload"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="resume-upload"
                    className={`inline-block px-6 py-3 rounded-lg cursor-pointer ${
                      darkMode
                        ? 'bg-gray-600 hover:bg-gray-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-black'
                    }`}
                  >
                    Select File
                  </label>
                </>
              )}
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Supported formats: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Your job applications will appear here
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            className={`px-6 py-2 rounded-lg font-medium ${
              darkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;