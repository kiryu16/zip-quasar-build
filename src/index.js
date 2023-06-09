const m = process.version.match(/(\d+)\.(\d+)\.(\d+)/)
const [major, minor, patch] = m.slice(1).map(_ => parseInt(_))

const namePackage = major < 16 ? 'path' : 'node:path'

const path = require(namePackage)
const Zip = require('zip-a-folder')
const openExplorer = require('open-file-explorer')

const date = new Date()

class ZipBuild {
  constructor(input, output) {
    this.input = input
    this.output = output
  }

  async main() {
    await Zip.zip(this.input, this.output)
  }
}

/**
 *
 * @param {String} input Path to the folder to be compressed
 * @param {String} fileName Compressed file name
 * @param {String} quasarMode Quasar build mode
 */
const zipQuasarBuild = async (input, fileName, quasarMode) => {
  const dirOutput = path.dirname(input)
  let dateString = date.toISOString()
  dateString = dateString.replace(/:|\./g, '_')
  const realOutput = `${dirOutput}/${fileName}-${quasarMode}_${dateString}.zip`
  const zipBuildInstance = new ZipBuild(input, realOutput)
  await zipBuildInstance.main()
  openExplorer(dirOutput, err => {
    if (err) {
      console.log(err)
    }
  })
}

module.exports = {
  zipQuasarBuild
}
