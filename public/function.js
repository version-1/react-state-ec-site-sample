const { ipcRenderer } = window.electronAPI

document.querySelector('button').addEventListener('click', onSubmit)

function onSubmit() {
  const input = document.querySelector("#script").value
  console.log('input', input)
  // 入力されたスクリプトのパスをメインプロセスに送信
  const {stdout, stderr} = ipcRenderer.sendSync('execute-script', input)
  const result = document.querySelector('#result')
  console.log(stdout, stderr)

  result.style.color = 'black'

  if (stdout) {
    result.innerHTML = stdout
  }

  if (stderr) {
    result.style.color = 'red'
    result.innerHTML = stderr
  }
}
