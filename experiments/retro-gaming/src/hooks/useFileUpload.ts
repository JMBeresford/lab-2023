export function useFileUpload(
  romSetter: (rom: Uint8Array | File | string, fileName?: string) => void,
) {
  async function onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      // Convert the selected file into an array buffer
      const rom = await fileToArrayBuffer(target.files[0]);

      // load game
      romSetter(new Uint8Array(rom), target.files[0].name);
    }
  }

  function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);

      fileReader.onerror = () => {
        fileReader.abort();
        reject(new Error("Error parsing file"));
      };

      fileReader.readAsArrayBuffer(file);
    });
  }

  function openFile() {
    const fileUpload = document.createElement("input");
    fileUpload.type = "file";
    fileUpload.onchange = onFileChange;

    if (fileUpload) {
      fileUpload.click();
    }
  }

  return { openFile };
}
