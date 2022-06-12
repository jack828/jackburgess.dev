const projectsData = [
  {
    title: 'ESP32 Solar System',
    description: `
Using a MAKERFABS ESP32-TOUCH-CAMERA development board, I ported and extended some code by another user to work with the constraints of the ESP32 environment.
This project was a 2D simulation of the positions of the planets in the solar system at a configurable time.
`,
    imgSrc: '/static/images/projects--esp32-solar.jpeg',
    href: 'https://github.com/jack828/esp32-solar',
    linkText: 'See on GitHub'
  },
  {
    title: 'ESP32 Logger',
    description: `
My home environment logger has gone through multiple iterations - first it logged data by POSTing to PiHome (which was a MongoDB backend with some very primitive graphing capabilities!) - now it uses InfluxDB+Grafana on my home NAS to supercharge my metrics. Data has never tasted so sweet.
`,
    imgSrc: '/static/images/projects--esp32-logger.jpeg',
    href: 'https://github.com/jack828/esp32-logger',
    linkText: 'See on GitHub'
  },
  {
    title: 'Dotfiles',
    description: `
The heart of my development environment - using Neovim and Tmux to effortlessly refactor code and add new features (and bugs).
`,
    href: 'https://github.com/jack828/dotfiles',
    linkText: 'See on GitHub'
  }
]

export default projectsData
