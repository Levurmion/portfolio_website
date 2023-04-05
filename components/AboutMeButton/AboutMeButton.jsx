
import styles from './AboutMeButton.module.scss';

function AboutMeButton({id}) {

  return (
    <div id={id}>
      <svg
      className={styles.button}
      height='100%'
      viewBox='0 0 219 58'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect width='219' height='58' rx='29' fill='#29A0B1' />
      <path
        d='M27.6797 20.8574L21.0898 39H18.3965L25.9844 19.0938H27.7207L27.6797 20.8574ZM33.2031 39L26.5996 20.8574L26.5586 19.0938H28.2949L35.9102 39H33.2031ZM32.8613 31.6309V33.791H21.6777V31.6309H32.8613ZM38.1797 18H40.7227V36.1289L40.5039 39H38.1797V18ZM50.7168 31.4805V31.7676C50.7168 32.8431 50.5892 33.8411 50.334 34.7617C50.0788 35.6732 49.7051 36.4661 49.2129 37.1406C48.7207 37.8151 48.1191 38.3392 47.4082 38.7129C46.6973 39.0866 45.8815 39.2734 44.9609 39.2734C44.0221 39.2734 43.1973 39.1139 42.4863 38.7949C41.7845 38.4668 41.1921 37.9974 40.709 37.3867C40.2259 36.776 39.8385 36.0378 39.5469 35.1719C39.2643 34.306 39.0684 33.3307 38.959 32.2461V30.9883C39.0684 29.8945 39.2643 28.9147 39.5469 28.0488C39.8385 27.1829 40.2259 26.4447 40.709 25.834C41.1921 25.2142 41.7845 24.7448 42.4863 24.4258C43.1882 24.0977 44.0039 23.9336 44.9336 23.9336C45.8633 23.9336 46.6882 24.1159 47.4082 24.4805C48.1283 24.8359 48.7298 25.3464 49.2129 26.0117C49.7051 26.6771 50.0788 27.4746 50.334 28.4043C50.5892 29.3249 50.7168 30.3503 50.7168 31.4805ZM48.1738 31.7676V31.4805C48.1738 30.7422 48.1055 30.0495 47.9688 29.4023C47.832 28.7461 47.6133 28.1719 47.3125 27.6797C47.0117 27.1784 46.6152 26.7865 46.123 26.5039C45.6309 26.2122 45.0247 26.0664 44.3047 26.0664C43.6667 26.0664 43.1107 26.1758 42.6367 26.3945C42.1719 26.6133 41.7754 26.9095 41.4473 27.2832C41.1191 27.6478 40.8503 28.0671 40.6406 28.541C40.4401 29.0059 40.2897 29.4889 40.1895 29.9902V33.2852C40.3353 33.9232 40.5723 34.5384 40.9004 35.1309C41.2376 35.7142 41.6842 36.1927 42.2402 36.5664C42.8053 36.9401 43.5026 37.127 44.332 37.127C45.0156 37.127 45.599 36.9902 46.082 36.7168C46.5742 36.4342 46.9707 36.0469 47.2715 35.5547C47.5814 35.0625 47.8092 34.4928 47.9551 33.8457C48.1009 33.1986 48.1738 32.5059 48.1738 31.7676ZM53.2461 31.7676V31.4531C53.2461 30.3867 53.401 29.3978 53.7109 28.4863C54.0208 27.5658 54.4674 26.7682 55.0508 26.0938C55.6341 25.4102 56.3405 24.8815 57.1699 24.5078C57.9993 24.125 58.929 23.9336 59.959 23.9336C60.998 23.9336 61.9323 24.125 62.7617 24.5078C63.6003 24.8815 64.3112 25.4102 64.8945 26.0938C65.487 26.7682 65.9382 27.5658 66.248 28.4863C66.5579 29.3978 66.7129 30.3867 66.7129 31.4531V31.7676C66.7129 32.834 66.5579 33.8229 66.248 34.7344C65.9382 35.6458 65.487 36.4434 64.8945 37.127C64.3112 37.8014 63.6048 38.3301 62.7754 38.7129C61.9551 39.0866 61.0254 39.2734 59.9863 39.2734C58.9473 39.2734 58.013 39.0866 57.1836 38.7129C56.3542 38.3301 55.6432 37.8014 55.0508 37.127C54.4674 36.4434 54.0208 35.6458 53.7109 34.7344C53.401 33.8229 53.2461 32.834 53.2461 31.7676ZM55.7754 31.4531V31.7676C55.7754 32.5059 55.862 33.2031 56.0352 33.8594C56.2083 34.5065 56.4681 35.0807 56.8145 35.582C57.1699 36.0833 57.612 36.4798 58.1406 36.7715C58.6693 37.054 59.2845 37.1953 59.9863 37.1953C60.679 37.1953 61.2852 37.054 61.8047 36.7715C62.3333 36.4798 62.7708 36.0833 63.1172 35.582C63.4635 35.0807 63.7233 34.5065 63.8965 33.8594C64.0788 33.2031 64.1699 32.5059 64.1699 31.7676V31.4531C64.1699 30.724 64.0788 30.0358 63.8965 29.3887C63.7233 28.7324 63.459 28.1536 63.1035 27.6523C62.7572 27.1419 62.3197 26.7409 61.791 26.4492C61.2715 26.1576 60.6608 26.0117 59.959 26.0117C59.2663 26.0117 58.6556 26.1576 58.127 26.4492C57.6074 26.7409 57.1699 27.1419 56.8145 27.6523C56.4681 28.1536 56.2083 28.7324 56.0352 29.3887C55.862 30.0358 55.7754 30.724 55.7754 31.4531ZM78.9355 35.582V24.207H81.4785V39H79.0586L78.9355 35.582ZM79.4141 32.4648L80.4668 32.4375C80.4668 33.4219 80.362 34.3333 80.1523 35.1719C79.9518 36.0013 79.6237 36.7214 79.168 37.332C78.7122 37.9427 78.1152 38.4212 77.377 38.7676C76.6387 39.1048 75.7409 39.2734 74.6836 39.2734C73.9635 39.2734 73.3027 39.1686 72.7012 38.959C72.1087 38.7493 71.5983 38.4258 71.1699 37.9883C70.7415 37.5508 70.4089 36.9811 70.1719 36.2793C69.944 35.5775 69.8301 34.7344 69.8301 33.75V24.207H72.3594V33.7773C72.3594 34.4427 72.4323 34.9941 72.5781 35.4316C72.7331 35.86 72.9382 36.2018 73.1934 36.457C73.4577 36.7031 73.7493 36.8763 74.0684 36.9766C74.3965 37.0768 74.7337 37.127 75.0801 37.127C76.1556 37.127 77.0078 36.9219 77.6367 36.5117C78.2656 36.0924 78.7168 35.5319 78.9902 34.8301C79.2728 34.1191 79.4141 33.3307 79.4141 32.4648ZM91.5273 24.207V26.1484H83.5293V24.207H91.5273ZM86.2363 20.6113H88.7656V35.3359C88.7656 35.8372 88.8431 36.2155 88.998 36.4707C89.153 36.7259 89.3535 36.8945 89.5996 36.9766C89.8457 37.0586 90.11 37.0996 90.3926 37.0996C90.6022 37.0996 90.821 37.0814 91.0488 37.0449C91.2858 36.9993 91.4635 36.9629 91.582 36.9355L91.5957 39C91.3952 39.0638 91.1309 39.123 90.8027 39.1777C90.4837 39.2415 90.0964 39.2734 89.6406 39.2734C89.0208 39.2734 88.4512 39.1504 87.9316 38.9043C87.4121 38.6582 86.9974 38.248 86.6875 37.6738C86.3867 37.0905 86.2363 36.3066 86.2363 35.3223V20.6113ZM102.656 19.0938H105.213L111.734 35.3223L118.242 19.0938H120.812L112.719 39H110.723L102.656 19.0938ZM101.822 19.0938H104.078L104.447 31.2344V39H101.822V19.0938ZM119.377 19.0938H121.633V39H119.008V31.2344L119.377 19.0938ZM132.023 39.2734C130.993 39.2734 130.059 39.1003 129.221 38.7539C128.391 38.3984 127.676 37.9017 127.074 37.2637C126.482 36.6257 126.026 35.8691 125.707 34.9941C125.388 34.1191 125.229 33.1621 125.229 32.123V31.5488C125.229 30.3457 125.406 29.2747 125.762 28.3359C126.117 27.388 126.6 26.5859 127.211 25.9297C127.822 25.2734 128.514 24.7767 129.289 24.4395C130.064 24.1022 130.866 23.9336 131.695 23.9336C132.753 23.9336 133.664 24.1159 134.43 24.4805C135.204 24.8451 135.838 25.3555 136.33 26.0117C136.822 26.6589 137.187 27.4245 137.424 28.3086C137.661 29.1836 137.779 30.1406 137.779 31.1797V32.3145H126.732V30.25H135.25V30.0586C135.214 29.4023 135.077 28.7643 134.84 28.1445C134.612 27.5247 134.247 27.0143 133.746 26.6133C133.245 26.2122 132.561 26.0117 131.695 26.0117C131.121 26.0117 130.592 26.1348 130.109 26.3809C129.626 26.6178 129.212 26.9733 128.865 27.4473C128.519 27.9212 128.25 28.5 128.059 29.1836C127.867 29.8672 127.771 30.6556 127.771 31.5488V32.123C127.771 32.8249 127.867 33.4857 128.059 34.1055C128.259 34.7161 128.546 35.2539 128.92 35.7188C129.303 36.1836 129.763 36.5482 130.301 36.8125C130.848 37.0768 131.467 37.209 132.16 37.209C133.053 37.209 133.81 37.0267 134.43 36.6621C135.049 36.2975 135.592 35.8099 136.057 35.1992L137.588 36.416C137.269 36.8991 136.863 37.3594 136.371 37.7969C135.879 38.2344 135.273 38.5898 134.553 38.8633C133.842 39.1367 132.999 39.2734 132.023 39.2734Z'
        fill='white'
      />
      <mask
        id='mask0_2_20'
        style={{maskType: 'alpha'}}
        maskUnits='userSpaceOnUse'
        x='166'
        y='8'
        width='43'
        height='43'>
        <rect x='166' y='8' width='43' height='43' fill='white' />
      </mask>
      <g mask='url(#mask0_2_20)'>
        <path
          d='M191.183 39.4747L189.778 38.0914L197.475 30.3941H173.797V28.4302H197.475L189.75 20.7053L191.156 19.353L201.23 29.4277L191.183 39.4747Z'
          fill='white'
        />
      </g>
      </svg>
    </div>
  );
}

export default AboutMeButton;
