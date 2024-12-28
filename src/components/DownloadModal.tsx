import { toJpeg, toPng } from "html-to-image";
import React, { useEffect, useState } from "react";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { DownloadModalProps } from "../types/modalTypes";
import Button from "./Buttons";
import "./styles/DownloadModalStyles.css";

function downloadDiagram(
  dataUrl: string,
  fileName: string,
  fileExtension: string
) {
  const a = document.createElement("a");

  a.setAttribute("download", `${fileName}.${fileExtension.toLowerCase()}`);
  a.setAttribute("href", dataUrl);
  a.click();
}

export const DownloadModal = ({
  isOpen,
  onClose,
  diagramWidth,
  diagramHeight,
  getViewport,
}: DownloadModalProps) => {
  const [backgroundColor, setBackgroundColor] = useState("#CCBBEE");
  const [imageWidth, setImageWidth] = useState<number>(diagramWidth);
  const [imageHeight, setImageHeight] = useState<number>(diagramHeight);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("New Diagram");
  const [keepAspectRatio, setKeepAspectratio] = useState(false);
  const [keepAspectratioIcon, setKeepAspectratioIcon] = useState<string>("🔗");
  const [timeout, setTimeout] = useState<number | null>(null);
  const [fileExtension, setFileExtension] = useState("PNG");
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [imageQuality, setImageQuality] = useState<string>("100");
  const [lastValidQuality, setLastValidQuality] = useState<string>("100");

  

  useEffect(() => {
    // console.log("diagram dimensions", diagramHeight,diagramWidth)
    if (isOpen) {
      // setImageWidth(diagramWidth);
      // setImageHeight(diagramHeight);
      generatePreview();
    }
  }, [isOpen, backgroundColor, imageWidth, imageHeight, imageQuality, diagramWidth, diagramHeight]);

  const generatePreview = () => {
    const parsedQuality = parseInt(imageQuality) / 100;
    const viewport = getViewport();
    const element = document.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement | null;
    if (element) {
      const imageProps = {
        skipFonts: true,
        backgroundColor,
        // width: imageWidth,
        // height: imageHeight,
        quality: parsedQuality,
        style: {
          width: imageWidth.toString(),
          height: imageHeight.toString(),
          transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
        },
      };

      // const scaleWidth = imageWidth / diagramWidth;
      // const scaleHeight = imageHeight / diagramHeight;
      const canvas = document.createElement("canvas");
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      const ctx = canvas.getContext("2d");

      if (fileExtension === "PNG") {
        toPng(element, imageProps)
          .then((dataUrl) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              ctx?.drawImage(img, 0, 0, diagramWidth, diagramHeight, 0, 0, imageWidth, imageHeight);
              setImagePreview(canvas.toDataURL("image/png"));
              fetch(canvas.toDataURL("image/png"))
                .then((res) => res.blob())
                .then((blob) => setImageSize(blob.size));
            }
          })
          .catch((error) => {
            console.error("Error generating image: ", error);
          });
      }
      if (fileExtension === "JPG") {
        toJpeg(element, imageProps)
          .then((dataUrl) => {
            const img = new Image();
            img.src = dataUrl;
            img.onload = () => {
              ctx?.drawImage(img, 0, 0, diagramWidth, diagramHeight, 0, 0, imageWidth, imageHeight);
              setImagePreview(canvas.toDataURL("image/jpeg"));
              fetch(canvas.toDataURL("image/jpeg"))
                .then((res) => res.blob())
                .then((blob) => setImageSize(blob.size));
            };
          })
          .catch((error) => {
            console.error("Error generating image: ", error);
          });
      }
    } else {
      console.error("Element not fount");
    }
  };

  const handleKeepAspectRatio = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setKeepAspectratioIcon("⛓️‍💥");
      setKeepAspectratio(true);
      setImageHeight(imageWidth);
    } else {
      setKeepAspectratioIcon("🔗");
      setKeepAspectratio(false);
    }
  };

  const changeImageWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const size = event.target.value;
    setImageWidth(parseInt(size));
    if (keepAspectRatio) {
      setImageHeight(parseInt(size));
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    if (timeout) {
      clearTimeout(timeout);
    }
    const newTimeout = window.setTimeout(() => {
      setBackgroundColor(newColor);
    }, 100);
    setTimeout(newTimeout);
  };

  const handleSetTransparentBackground = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.checked) {
      setBackgroundColor("");
    } else {
      setBackgroundColor("#CCBBEE");
    }
  };

  const formatFileSize = () => {
    if (imageSize) {
      if (imageSize > 1024 ** 2) {
        const formattedSize =
          (imageSize / 1024 ** 2).toFixed(2).toString() + " Mb";
        return formattedSize;
      } else {
        const formattedSize = (imageSize / 1024).toFixed(2).toString() + " kb";
        return formattedSize;
      }
    }
  };

  const handleQualityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace("%", "");
    if (!isNaN(Number(value)) && Number(value) >= 1 && Number(value) <= 100) {
      setImageQuality(value);
      setLastValidQuality(value);
    } else {
      setImageQuality(value);
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    const newTimeout = window.setTimeout(() => {
      generatePreview();
    }, 300);
    setTimeout(newTimeout);
  };

  const handleQualityBlur = () => {
    if (
      isNaN(Number(imageQuality)) ||
      Number(imageQuality) < 1 ||
      Number(imageQuality) > 100
    ) {
      setImageQuality(lastValidQuality);
    } else {
      setImageQuality(Number(imageQuality).toString());
    }
    // generatePreview();
  };

  // const changeRatioLinked = (event: ChangeEvent<HTMLInputElement>) => {
  //   setImageWidth(parseInt(event.target.value))
  //   setImageHeight(parseInt(event.target.value))
  // }

  if (!isOpen) return null;

  return (
    <div className="select-none fixed inset-0 flex items-center justify-center bg-black/30">
      <dialog
        open={isOpen}
        className="flex flex-col bg-slate-200 px-6 pt-6 rounded-2xl shadow-lg shadow-slate-900"
        style={{
          width: "80%",
          height: "85vh",
        }}
      >
        <div className="flex">
          {/* DIAGRAM PREVIEW */}
          <div
            className="p-2 flex items-center justify-center bg-white rounded-lg"
            style={{
              width: "80%",
            }}
          >
            {/* <p>Diagram Preview:</p> */}
            <div
              className="w-full h-full flex items-center justify-center cursor-grab"
              style={{
                width: "auto",
              }}
            >
              <div className="flex items-end justify-end">
                <TransformWrapper maxScale={2} smooth>
                  <TransformComponent>
                    <img
                      id="imgPreview"
                      src={imagePreview as string}
                      alt="Diagram Preview"
                      className="object-contain bg-black/20"
                      style={{
                        width: "100%",
                        height: "75vh",
                      }}
                    />
                  </TransformComponent>
                </TransformWrapper>
                <p className="absolute w-1/12 py-2 bg-black/70 text-center text-white text-sm">
                  {formatFileSize()}
                </p>
              </div>
            </div>
          </div>
          {/* DOWNLOAD OPTIONS */}
          <div
            className="flex flex-1 flex-col p-4"
            style={{
              width: "20%",
              height: "100%",
            }}
          >
            {/* ============= AJUSTES DEL DIAGRAMA EXPORTADO ============ */}
            {/* NOMBRE DEL DIAGRAMA */}
            <label>File Name:</label>
            <div className="flex">
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="focus-visible:outline-none w-48"
              />
              <select
                className="mx-2 border-none outline-none rounded bg-slate-300 selection:bg-red-300"
                onChange={(e) => setFileExtension(e.target.value)}
              >
                <option>PNG</option>
                <option>JPG</option>
              </select>
            </div>
            {/* COLOR DE FONDO */}
            <div className="flex align-middle items-center mt-2 mb-1">
              <label>Background Color:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => handleColorChange(e)}
                className="appearance-none w-12 h-12 bg-transparent border-none cursor-pointer mx-2"
              />
            </div>
            <div className="flex mb-4 hover:text-purple-600 cursor-pointer transition-all align-middle items-center">
              <input
                type="checkbox"
                className="mr-2 appearance-none bg-white border-1 border-slate-400 w-5 h-5 rounded-full checked:bg-purple-400 checked:border-1 checked:border-purple-700 transition-all disabled:bg-gray-300"
                onChange={(e) => handleSetTransparentBackground(e)}
                disabled={fileExtension !== "PNG"}
              />
              <label
                className={`${fileExtension !== "PNG" ? "text-gray-400" : ""}`}
              >
                Transparent Background
              </label>
            </div>

            {/* CALIDAD DE LA IMAGEN */}
            <div className="mt-2 mb-4">
              <label>Quality:</label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  className="custom-range"
                  value={imageQuality}
                  onChange={(e) => {
                    if (e.target.value === "0") {
                      e.target.value = "1";
                    }
                    handleQualityChange(e);
                  }}
                  disabled={fileExtension !== "JPG"}
                />
                <input
                  type="text"
                  min={5}
                  max={100}
                  step={1}
                  value={imageQuality + "%"}
                  onChange={(e) => handleQualityChange(e)}
                  onBlur={handleQualityBlur}
                  className="w-16 outline-none text-right"
                  disabled={fileExtension !== "JPG"}
                />
              </div>
            </div>

            {/* AGREGAR FORMATO Y QUIZÁS CALIDAD */}

            {/* ==========TAMAÑO DEL DIAGRAMA =========*/}
            <div className="grid grid-cols-2 gap-2 relative">
              {/* Columna izquierda con los inputs */}
              <div className="flex flex-col gap-2">
                {/* WIDTH INPUT */}
                <div className="flex items-center">
                  <label className="w-16">width:</label>
                  <input
                    type="number"
                    value={imageWidth}
                    onChange={(e) => changeImageWidth(e)}
                    className="w-16 mr-2 focus-visible:outline-none"
                  />
                  <span>px</span>
                </div>

                {/* HEIGHT INPUT */}
                <div className="flex items-center">
                  <label className="w-16">height:</label>
                  <input
                    type="number"
                    value={imageHeight}
                    onChange={(e) => setImageHeight(parseInt(e.target.value))}
                    disabled={keepAspectRatio}
                    className="w-16 mr-2 focus-visible:outline-none"
                  />
                  <span>px</span>
                </div>
              </div>

              {/* KEEP ASPECT RATIO */}
              {/* <button
                  className="ml-4 p-1 border-2 border-black/40 rounded hover:bg-slate-300 hover:border-slate-300"
                  onClick={handleKeepAspectRatio}
                >
                  {keepAspectratioIcon}
                </button> */}
              <div className="flex items-center">
                <div className="relative ml-8 align-middle items-center">
                  <input
                    type="checkbox"
                    className="appearance-none w-8 h-8 border-2 border-black/40 rounded hover:bg-slate-300  "
                    onChange={(e) => {
                      handleKeepAspectRatio(e);
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center pointer-events-none mb-1">
                    {keepAspectratioIcon}
                  </span>
                </div>
              </div>
            </div>

            {/* AGREGAR BOTON PARA MANTENER LA PROPORCION (BOTON DE CADENA) */}
            {/* =================================== */}

            <div className="mt-auto flex justify-end pt-4">
              <Button onClick={onClose} type="cancel" className="mx-2">
                Cancel
              </Button>
              <Button
                className="mx-2 px-4"
                onClick={() =>
                  downloadDiagram(
                    imagePreview as string,
                    fileName,
                    fileExtension
                  )
                }
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
