const m = process.version.match(/(\d+)\.(\d+)\.(\d+)/)
const [major] = m.slice(1).map(_ => parseInt(_))

const namePackage = major < 16 ? 'path' : 'node:path'

const path = await import(namePackage)
import { zip } from 'zip-a-folder'
import openExplorer from 'open-file-explorer'

const date = new Date()

class ZipBuild {
  constructor(input, output) {
    this.input = input
    this.output = output
  }

  async main() {
    await zip(this.input, this.output)
  }
}

/**
 *
 * @param {String} input Path to the folder to be compressed
 * @param {String} fileName Compressed file name
 * @param {String} quasarMode Quasar build mode
 * @param {Boolean} openFE Open file explorer after compressing
 * @returns {Promise<void>}
 */
const zipQuasarBuild = async ({ input, fileName, quasarMode, openFE }) => {
  const dirOutput = path.dirname(input)
  let dateString = `${date.toLocaleDateString('es-MX', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}_${date.toLocaleTimeString('es-MX', {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })}`
  dateString = dateString.replace(/[:/]/g, '-')
  const realOutput = `${dirOutput}/${quasarMode}-${fileName}_${dateString}.zip`
  const zipBuildInstance = new ZipBuild(input, realOutput)
  await zipBuildInstance.main()
  if (openFE) {
    openExplorer(dirOutput, err => {
      if (err) {
        console.log(err)
      }
    })
  }
}

export {
  zipQuasarBuild
}
