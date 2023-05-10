import ApiConstants from "../constants/ApiConstants";

const getLogo = imageId =>
    `${ApiConstants.STATIC_IMAGE.BASE_URL}/logo/${imageId}.png`;

const getProfile = imageId =>
    `${ApiConstants.STATIC_IMAGE.BASE_URL}/profile/${imageId}.jpg`;

const getPoster = (imageId, quality = ApiConstants.STATIC_IMAGE.QUALITY.HD) =>
    `${ApiConstants.STATIC_IMAGE.BASE_URL}/poster/${quality}/${imageId}.png`;

export default { getLogo,getProfile,getPoster };