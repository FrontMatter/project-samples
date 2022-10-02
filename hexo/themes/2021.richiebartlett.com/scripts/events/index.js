hexo.on('ready', () => {
  const { version } = require('../../package.json');
  hexo.log.info(`
  _ __   _        _ __                _ __               _                       
  ( /  ) //       ( /  ) o     /  o   ( /  )         _/_ //   _/__/_              
   /--< // __ _,   /--< ,  _, /_ ,  _  /--< __,  _   /  // _  /  /   _, __ _ _ _  
  /___/(/_(_)(_)_o/   \_(_(__/ /_(_(/_/___/(_/(_/ (_(__(/_(/_(__(__o(__(_)/ / / /_
              /|                                                                  
             (/                                                                   
    ============================================================
     RichieBartlett.com Theme: ${version}
     Repo: https://github.com/lorezyra/blog.RichieBartlett.com
    ============================================================`);
});
/* 
  ASCII art generated from: 
    https://patorjk.com/software/taag/#p=display&f=Santa%20Clara&t=Blog.RichieBartlett.com
  alternatives: 
    https://patorjk.com/software/taag/#p=display&f=Doh&t=Blog.RichieBartlett.com
    https://patorjk.com/software/taag/#p=display&f=Slant&t=Blog.RichieBartlett.com

*/