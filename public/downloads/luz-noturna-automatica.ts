basic.forever(function () {
  if (input.lightLevel() < 80) {
    basic.showLeds(`
      # # # # #
      # # # # #
      # # # # #
      # # # # #
      # # # # #
    `)
  } else {
    basic.clearScreen()
  }
  basic.pause(200)
})
