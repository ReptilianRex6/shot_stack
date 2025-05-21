export function useImageUpload(options: { initialImage?: string; onUpload?: (url: string) => void } = {}) {
    let previewUrl = $state<string | null>(options.initialImage || null);
    let fileName = $state<string | null>(null);
    let fileInput = $state<HTMLInputElement | null>(null);
    let files = $state<FileList | null>(null);
    const onUploadCallback = options.onUpload;

    function handleFilesChange(newFiles: FileList | null) {
        files = newFiles;
        const selectedFile = newFiles?.[0];
        if (selectedFile) {
            fileName = selectedFile.name;
            const newUrl = URL.createObjectURL(selectedFile);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            previewUrl = newUrl;
            onUploadCallback?.(newUrl);
        }
    }

    function handleThumbnailClick() {
        fileInput?.click();
    }

    function handleRemoveImage() {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        previewUrl = null;
        fileName = null;
        if (fileInput) {
            fileInput.value = '';
        }
        files = null;
    }

    function cleanup() {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    }

    return {
        get previewUrl() {
            return previewUrl;
        },
        get fileName() {
            return fileName;
        },
        get fileInput() {
            return fileInput;
        },
        set fileInput(element: HTMLInputElement | null) {
            fileInput = element;
        },
        get files() {
            return files;
        },
        set files(newFiles: FileList | null) {
            handleFilesChange(newFiles);
        },
        handleThumbnailClick,
        handleRemove: handleRemoveImage,
        destroy: cleanup
    };
}
