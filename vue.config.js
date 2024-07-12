module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      customFileProtocol: './',
      builderOptions: {
        asar: true,
        appId: "weektodo-app.netlify.app",
        productName: "WeekToDo",
        publish: ["github"],
        linux: {
          category: "Utility",
          description: "Free and Open Source Minimalist Weekly Planner and To Do list App focused on privacy.",
          target: ["deb", "rpm", "pacman","AppImage"],
          icon: "build/icon.icns",
        },
        win: {
          target: ["nsis"],
        },
        mac: {
          category: "public.app-category.productivity",
          target: ["dmg", "pkg"],
        },
      },
    },
  }
};

const crypto = require('crypto');

/**
 * The MD4 algorithm is not available anymore in Node.js 17+ (because of library SSL 3).
 * In that case, silently replace MD4 by the MD5 algorithm.
 */
try {
  crypto.createHash('md4');
} catch (e) {
  console.warn('Crypto "MD4" is not supported anymore by this Node.js version');
  const origCreateHash = crypto.createHash;
  crypto.createHash = (alg, opts) => {
    return origCreateHash(alg === 'md4' ? 'md5' : alg, opts);
  };
}
