import { Users, Trophy, Droplets, TrendingUp, MessageCircle, Award } from 'lucide-react';

const Community = () => {
  const leaderboard = [
    { rank: 1, name: 'Sarah Johnson', savings: 1250, streak: 45 },
    { rank: 2, name: 'Mike Chen', savings: 1180, streak: 38 },
    { rank: 3, name: 'Emma Davis', savings: 1050, streak: 32 },
    { rank: 4, name: 'You', savings: 890, streak: 28 },
    { rank: 5, name: 'Alex Kumar', savings: 750, streak: 21 },
  ];

  const achievements = [
    { icon: Droplets, title: 'Water Warrior', description: '30-day hydration streak', unlocked: true },
    { icon: Trophy, title: 'Eco Champion', description: 'Saved 1000L of water', unlocked: true },
    { icon: TrendingUp, title: 'Efficiency Expert', description: 'Optimal usage for 7 days', unlocked: false },
    { icon: Award, title: 'Community Leader', description: 'Help 10 users', unlocked: false },
  ];

  const tips = [
    { user: 'Sarah J.', tip: 'I set reminders every 2 hours to drink water. Game changer!', likes: 24 },
    { user: 'Mike C.', tip: 'Keep a reusable bottle at your desk. You\'ll drink more naturally.', likes: 18 },
    { user: 'Emma D.', tip: 'Track your water intake with the app. Seeing progress motivates me!', likes: 15 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Connect with other AWG users and share your journey
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Community Members</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">2,847</p>
            </div>
            <Users className="w-8 h-8 text-primary-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Water Saved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">1.2M L</p>
            </div>
            <Droplets className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Challenges</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">12</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leaderboard */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Leaderboard
            </h3>
            <Trophy className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name === 'You'
                    ? 'bg-primary-50 dark:bg-primary-900 border-2 border-primary-600'
                    : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    user.rank === 2 ? 'bg-gray-300 text-gray-900' :
                    user.rank === 3 ? 'bg-orange-400 text-orange-900' :
                    'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.streak} day streak
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{user.savings}L</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">saved</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Your Achievements
          </h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`flex items-center space-x-3 p-3 rounded-lg ${
                  achievement.unlocked
                    ? 'bg-green-50 dark:bg-green-900'
                    : 'bg-gray-50 dark:bg-gray-700 opacity-50'
                }`}
              >
                <achievement.icon className={`w-8 h-8 ${
                  achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {achievement.title}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {achievement.description}
                  </p>
                </div>
                {achievement.unlocked && (
                  <Award className="w-5 h-5 text-yellow-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Tips */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Community Tips & Tricks
          </h3>
          <MessageCircle className="w-5 h-5 text-primary-600" />
        </div>
        <div className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {tip.user[0]}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">{tip.user}</p>
                  <p className="text-gray-700 dark:text-gray-300 mt-1">{tip.tip}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <button className="hover:text-primary-600">❤️ {tip.likes} likes</button>
                    <button className="hover:text-primary-600">Reply</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-4 btn-primary">
          Share Your Tip
        </button>
      </div>
    </div>
  );
};

export default Community;
