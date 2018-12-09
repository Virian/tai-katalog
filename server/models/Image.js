const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
  image: {
    Make: String,
    Model: String,
    Orientation: Number,
    XResolution: Number,
    YResolution: Number,
    ResolutionUnit: Number,
    Software: String,
    ModifyDate: String,
    YCbCrPositioning: Number,
    Copyright: String,
    ExifOffset: Number
  },
  thumbnail: {
    Compression: Number,
    Orientation: Number,
    XResolution: Number,
    YResolution: Number,
    ResolutionUnit: Number,
    ThumbnailOffset: Number,
    ThumbnailLength: Number,
    YCbCrPositioning: Number
  },
  exif: {
    FNumber: Number,
    ExposureProgram: Number,
    ISO: Number,
    ExifVersion: Buffer,
    DateTimeOriginal: String,
    CreateDate: String,
    ComponentsConfiguration: Buffer,
    CompressedBitsPerPixel: Number,
    ShutterSpeedValue: Number,
    ApertureValue: Number,
    BrightnessValue: Number,
    ExposureCompensation: Number,
    MaxApertureValue: Number,
    MeteringMode: Number,
    Flash: Number,
    FocalLength: Number,
    MakerNote: Buffer,
    FlashpixVersion: Buffer,
    ColorSpace: Number,
    ExifImageWidth: Number,
    ExifImageHeight: Number,
    InteropOffset: Number,
    FocalPlaneXResolution: Number,
    FocalPlaneYResolution: Number,
    FocalPlaneResolutionUnit: Number,
    SensingMethod: Number,
    FileSource: Buffer,
    SceneType: Buffer
  },
  gps: {},
  interoperability: {
    InteropIndex: String,
    InteropVersion: Buffer
  },
  makernote: {
    Version: Buffer,
    Quality: String,
    Sharpness: Number,
    WhiteBalance: Number,
    FujiFlashMode: Number,
    FlashExposureComp: Number,
    Macro: Number,
    FocusMode: Number,
    SlowSync: Number,
    AutoBracketing: Number,
    BlurWarning: Number,
    FocusWarning: Number,
    ExposureWarning: Number,
    error: String
  },
  url: String,
  userId: String // maybe it should be objectId instead // well it should but it works so I don't bother
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
