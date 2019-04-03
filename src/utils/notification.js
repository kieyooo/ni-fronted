import { notification } from 'antd';

/**
 *
 *
 * @export
 * @param {string} type success || error || info || warning 
 * @param {string} message notification title 
 * @param {string} description notification description
 * @param {string} [placement="topRight"] 
 */
export default function notificate(type, message, description, placement = "topRight") {
  notification[type]({
    message,
    description,
    key:'key',
    duration:1.5,
    placement
  })
}