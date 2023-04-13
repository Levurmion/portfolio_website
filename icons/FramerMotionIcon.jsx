import { useEffect, useRef, useState } from "react";

function FramerMotionIcon({ color }) {
   // const iconBoxRef = useRef(null);
   // const framerLogoRef = useRef(null);
   // const [textFontSize, setTextFontSize] = useState("10px");

   // const iconBox = {
   //    display: "flex",
   //    flexDirection: "column",
   //    height: "100%",
   //    alignItems: "center",
   //    justifyContent: "center",
   // };

   // const framerLogo = {
   //    transform: "translateY(3%)",
   // };

   // const motionText = {
   //    color: color,
   //    transform: "translateY(20%)",
   //    fontFamily: '"GET Walsheim", "Helvetica Neue", "Helvetica"',
   //    fontFeatureSettings: '"Liga", "clig"',
   //    fontSize: textFontSize,
   //    fontWeight: 600,
   // };

   // useEffect(() => {
   //    const iconBoxHeight = iconBoxRef.current.getBoundingClientRect().height;
   //    const framerLogoHeight =
   //       framerLogoRef.current.getBoundingClientRect().height;
   //    const remainingHeight = iconBoxHeight - framerLogoHeight;
   //    setTextFontSize(String(remainingHeight) + "px");
   // }, [textFontSize]);

   return (
      <svg
         height='100%'
         viewBox='0 0 500 500'
         fill='none'
         xmlns='http://www.w3.org/2000/svg'>
         <g clip-path='url(#clip0_118_7)'>
            <rect width='500' height='500' fill='none' />
            <g clip-path='url(#clip1_118_7)'>
               <path
                  d='M113.333 0H386.667V136.667H250L113.333 0ZM113.333 136.667H250L386.667 273.333H113.333V136.667ZM113.333 273.333H250V410L113.333 273.333Z'
                  fill={color}
               />
            </g>
            <path
               d='M106.68 428.456V497H115.32V439.976H115.512L136.92 497H144.696L166.104 439.976H166.296V497H174.936V428.456H162.456L140.76 486.056L119.16 428.456H106.68ZM195.201 472.232C195.201 469.224 195.585 466.568 196.353 464.264C197.185 461.896 198.305 459.912 199.713 458.312C201.121 456.712 202.753 455.496 204.609 454.664C206.529 453.832 208.545 453.416 210.657 453.416C212.769 453.416 214.753 453.832 216.609 454.664C218.529 455.496 220.193 456.712 221.601 458.312C223.009 459.912 224.097 461.896 224.865 464.264C225.697 466.568 226.113 469.224 226.113 472.232C226.113 475.24 225.697 477.928 224.865 480.296C224.097 482.6 223.009 484.552 221.601 486.152C220.193 487.688 218.529 488.872 216.609 489.704C214.753 490.536 212.769 490.952 210.657 490.952C208.545 490.952 206.529 490.536 204.609 489.704C202.753 488.872 201.121 487.688 199.713 486.152C198.305 484.552 197.185 482.6 196.353 480.296C195.585 477.928 195.201 475.24 195.201 472.232ZM186.561 472.232C186.561 475.88 187.073 479.272 188.097 482.408C189.121 485.544 190.657 488.296 192.705 490.664C194.753 492.968 197.281 494.792 200.289 496.136C203.297 497.416 206.753 498.056 210.657 498.056C214.625 498.056 218.081 497.416 221.025 496.136C224.033 494.792 226.561 492.968 228.609 490.664C230.657 488.296 232.193 485.544 233.217 482.408C234.241 479.272 234.753 475.88 234.753 472.232C234.753 468.584 234.241 465.192 233.217 462.056C232.193 458.856 230.657 456.104 228.609 453.8C226.561 451.432 224.033 449.576 221.025 448.232C218.081 446.888 214.625 446.216 210.657 446.216C206.753 446.216 203.297 446.888 200.289 448.232C197.281 449.576 194.753 451.432 192.705 453.8C190.657 456.104 189.121 458.856 188.097 462.056C187.073 465.192 186.561 468.584 186.561 472.232ZM256.182 447.368V432.488H248.022V447.368H239.574V454.568H248.022V486.152C248.022 488.456 248.246 490.312 248.694 491.72C249.142 493.128 249.814 494.216 250.71 494.984C251.67 495.752 252.886 496.296 254.358 496.616C255.894 496.872 257.718 497 259.83 497H266.07V489.8H262.326C261.046 489.8 259.99 489.768 259.158 489.704C258.39 489.576 257.782 489.352 257.334 489.032C256.886 488.712 256.566 488.264 256.374 487.688C256.246 487.112 256.182 486.344 256.182 485.384V454.568H266.07V447.368H256.182ZM284.255 438.44V428.456H276.095V438.44H284.255ZM276.095 447.368V497H284.255V447.368H276.095ZM303.328 472.232C303.328 469.224 303.712 466.568 304.48 464.264C305.312 461.896 306.432 459.912 307.84 458.312C309.248 456.712 310.88 455.496 312.736 454.664C314.656 453.832 316.672 453.416 318.784 453.416C320.896 453.416 322.88 453.832 324.736 454.664C326.656 455.496 328.32 456.712 329.729 458.312C331.136 459.912 332.224 461.896 332.993 464.264C333.825 466.568 334.24 469.224 334.24 472.232C334.24 475.24 333.825 477.928 332.993 480.296C332.224 482.6 331.136 484.552 329.729 486.152C328.32 487.688 326.656 488.872 324.736 489.704C322.88 490.536 320.896 490.952 318.784 490.952C316.672 490.952 314.656 490.536 312.736 489.704C310.88 488.872 309.248 487.688 307.84 486.152C306.432 484.552 305.312 482.6 304.48 480.296C303.712 477.928 303.328 475.24 303.328 472.232ZM294.688 472.232C294.688 475.88 295.2 479.272 296.224 482.408C297.248 485.544 298.784 488.296 300.832 490.664C302.88 492.968 305.408 494.792 308.416 496.136C311.424 497.416 314.88 498.056 318.784 498.056C322.752 498.056 326.208 497.416 329.152 496.136C332.161 494.792 334.689 492.968 336.737 490.664C338.785 488.296 340.321 485.544 341.344 482.408C342.369 479.272 342.881 475.88 342.881 472.232C342.881 468.584 342.369 465.192 341.344 462.056C340.321 458.856 338.785 456.104 336.737 453.8C334.689 451.432 332.161 449.576 329.152 448.232C326.208 446.888 322.752 446.216 318.784 446.216C314.88 446.216 311.424 446.888 308.416 448.232C305.408 449.576 302.88 451.432 300.832 453.8C298.784 456.104 297.248 458.856 296.224 462.056C295.2 465.192 294.688 468.584 294.688 472.232ZM352.981 447.368V497H361.141V468.968C361.141 466.728 361.429 464.68 362.005 462.824C362.645 460.904 363.573 459.24 364.789 457.832C366.005 456.424 367.509 455.336 369.301 454.568C371.157 453.8 373.333 453.416 375.829 453.416C378.965 453.416 381.429 454.312 383.221 456.104C385.013 457.896 385.909 460.328 385.909 463.4V497H394.069V464.36C394.069 461.672 393.781 459.24 393.205 457.064C392.693 454.824 391.765 452.904 390.421 451.304C389.077 449.704 387.317 448.456 385.141 447.56C382.965 446.664 380.245 446.216 376.981 446.216C369.621 446.216 364.245 449.224 360.853 455.24H360.661V447.368H352.981Z'
               fill={color}
            />
            <path
               d='M106.68 428.456V427.456H105.68V428.456H106.68ZM106.68 497H105.68V498H106.68V497ZM115.32 497V498H116.32V497H115.32ZM115.32 439.976V438.976H114.32V439.976H115.32ZM115.512 439.976L116.448 439.625L116.205 438.976H115.512V439.976ZM136.92 497L135.984 497.351L136.227 498H136.92V497ZM144.696 497V498H145.389L145.632 497.351L144.696 497ZM166.104 439.976V438.976H165.411L165.168 439.625L166.104 439.976ZM166.296 439.976H167.296V438.976H166.296V439.976ZM166.296 497H165.296V498H166.296V497ZM174.936 497V498H175.936V497H174.936ZM174.936 428.456H175.936V427.456H174.936V428.456ZM162.456 428.456V427.456H161.764L161.52 428.104L162.456 428.456ZM140.76 486.056L139.824 486.407L140.758 488.898L141.696 486.408L140.76 486.056ZM119.16 428.456L120.096 428.105L119.853 427.456H119.16V428.456ZM105.68 428.456V497H107.68V428.456H105.68ZM106.68 498H115.32V496H106.68V498ZM116.32 497V439.976H114.32V497H116.32ZM115.32 440.976H115.512V438.976H115.32V440.976ZM114.576 440.327L135.984 497.351L137.856 496.649L116.448 439.625L114.576 440.327ZM136.92 498H144.696V496H136.92V498ZM145.632 497.351L167.04 440.327L165.168 439.625L143.76 496.649L145.632 497.351ZM166.104 440.976H166.296V438.976H166.104V440.976ZM165.296 439.976V497H167.296V439.976H165.296ZM166.296 498H174.936V496H166.296V498ZM175.936 497V428.456H173.936V497H175.936ZM174.936 427.456H162.456V429.456H174.936V427.456ZM161.52 428.104L139.824 485.704L141.696 486.408L163.392 428.808L161.52 428.104ZM141.696 485.705L120.096 428.105L118.224 428.807L139.824 486.407L141.696 485.705ZM119.16 427.456H106.68V429.456H119.16V427.456ZM196.353 464.264L195.41 463.933L195.407 463.94L195.404 463.948L196.353 464.264ZM204.609 454.664L204.211 453.746L204.2 453.751L204.609 454.664ZM216.609 454.664L216.2 455.577L216.211 455.582L216.609 454.664ZM221.601 458.312L222.352 457.651L222.352 457.651L221.601 458.312ZM224.865 464.264L223.914 464.573L223.919 464.588L223.924 464.604L224.865 464.264ZM224.865 480.296L223.922 479.965L223.919 479.972L223.916 479.98L224.865 480.296ZM221.601 486.152L222.338 486.828L222.345 486.82L222.352 486.813L221.601 486.152ZM216.609 489.704L216.211 488.786L216.2 488.791L216.609 489.704ZM204.609 489.704L204.2 490.617L204.211 490.622L204.609 489.704ZM199.713 486.152L198.962 486.813L198.969 486.82L198.976 486.828L199.713 486.152ZM196.353 480.296L195.402 480.605L195.407 480.62L195.412 480.636L196.353 480.296ZM188.097 482.408L187.146 482.718L187.146 482.718L188.097 482.408ZM192.705 490.664L191.949 491.318L191.958 491.328L192.705 490.664ZM200.289 496.136L199.881 497.049L199.889 497.053L199.897 497.056L200.289 496.136ZM221.025 496.136L221.424 497.053L221.433 497.049L221.025 496.136ZM228.609 490.664L229.356 491.328L229.365 491.318L228.609 490.664ZM233.217 482.408L232.266 482.098L232.266 482.098L233.217 482.408ZM233.217 462.056L232.265 462.361L232.266 462.366L233.217 462.056ZM228.609 453.8L227.853 454.454L227.862 454.464L228.609 453.8ZM221.025 448.232L220.61 449.142L220.617 449.145L221.025 448.232ZM200.289 448.232L200.697 449.145L200.697 449.145L200.289 448.232ZM192.705 453.8L193.452 454.464L193.461 454.454L192.705 453.8ZM188.097 462.056L189.048 462.366L189.049 462.361L188.097 462.056ZM196.201 472.232C196.201 469.307 196.575 466.761 197.302 464.58L195.404 463.948C194.595 466.375 194.201 469.141 194.201 472.232H196.201ZM197.296 464.595C198.093 462.327 199.154 460.461 200.464 458.973L198.962 457.651C197.456 459.363 196.277 461.465 195.41 463.933L197.296 464.595ZM200.464 458.973C201.782 457.475 203.299 456.347 205.018 455.577L204.2 453.751C202.207 454.645 200.46 455.949 198.962 457.651L200.464 458.973ZM205.007 455.582C206.8 454.804 208.68 454.416 210.657 454.416V452.416C208.41 452.416 206.258 452.86 204.211 453.746L205.007 455.582ZM210.657 454.416C212.634 454.416 214.478 454.804 216.2 455.577L217.018 453.751C215.028 452.86 212.904 452.416 210.657 452.416V454.416ZM216.211 455.582C217.994 456.354 219.538 457.481 220.85 458.973L222.352 457.651C220.848 455.943 219.064 454.638 217.007 453.746L216.211 455.582ZM220.85 458.973C222.154 460.454 223.181 462.313 223.914 464.573L225.816 463.955C225.013 461.479 223.864 459.37 222.352 457.651L220.85 458.973ZM223.924 464.604C224.709 466.777 225.113 469.314 225.113 472.232H227.113C227.113 469.134 226.685 466.359 225.806 463.924L223.924 464.604ZM225.113 472.232C225.113 475.149 224.71 477.722 223.922 479.965L225.808 480.627C226.684 478.134 227.113 475.331 227.113 472.232H225.113ZM223.916 479.98C223.185 482.174 222.158 484.005 220.85 485.491L222.352 486.813C223.86 485.099 225.009 483.026 225.814 480.612L223.916 479.98ZM220.864 485.476C219.551 486.908 218.003 488.01 216.211 488.786L217.007 490.622C219.055 489.734 220.835 488.468 222.338 486.828L220.864 485.476ZM216.2 488.791C214.478 489.564 212.634 489.952 210.657 489.952V491.952C212.904 491.952 215.028 491.508 217.018 490.617L216.2 488.791ZM210.657 489.952C208.68 489.952 206.8 489.564 205.007 488.786L204.211 490.622C206.258 491.508 208.41 491.952 210.657 491.952V489.952ZM205.018 488.791C203.289 488.017 201.768 486.914 200.45 485.476L198.976 486.828C200.474 488.462 202.217 489.727 204.2 490.617L205.018 488.791ZM200.464 485.491C199.15 483.998 198.089 482.16 197.294 479.956L195.412 480.636C196.281 483.04 197.46 485.106 198.962 486.813L200.464 485.491ZM197.304 479.987C196.574 477.737 196.201 475.156 196.201 472.232H194.201C194.201 475.324 194.596 478.119 195.402 480.605L197.304 479.987ZM185.561 472.232C185.561 475.974 186.086 479.472 187.146 482.718L189.048 482.098C188.06 479.072 187.561 475.786 187.561 472.232H185.561ZM187.146 482.718C188.209 485.974 189.809 488.844 191.949 491.318L193.461 490.01C191.505 487.748 190.033 485.114 189.048 482.098L187.146 482.718ZM191.958 491.328C194.106 493.746 196.753 495.651 199.881 497.049L200.697 495.223C197.809 493.933 195.4 492.19 193.452 490L191.958 491.328ZM199.897 497.056C203.051 498.398 206.644 499.056 210.657 499.056V497.056C206.862 497.056 203.543 496.434 200.681 495.216L199.897 497.056ZM210.657 499.056C214.731 499.056 218.328 498.399 221.424 497.053L220.626 495.219C217.834 496.433 214.519 497.056 210.657 497.056V499.056ZM221.433 497.049C224.561 495.651 227.208 493.746 229.356 491.328L227.862 490C225.914 492.19 223.505 493.933 220.617 495.223L221.433 497.049ZM229.365 491.318C231.505 488.844 233.105 485.974 234.168 482.718L232.266 482.098C231.281 485.114 229.809 487.748 227.853 490.01L229.365 491.318ZM234.168 482.718C235.228 479.472 235.753 475.974 235.753 472.232H233.753C233.753 475.786 233.254 479.072 232.266 482.098L234.168 482.718ZM235.753 472.232C235.753 468.49 235.228 464.992 234.168 461.746L232.266 462.366C233.254 465.392 233.753 468.678 233.753 472.232H235.753ZM234.169 461.751C233.107 458.43 231.505 455.553 229.356 453.136L227.862 454.464C229.809 456.655 231.279 459.282 232.265 462.361L234.169 461.751ZM229.365 453.146C227.217 450.661 224.567 448.72 221.433 447.319L220.617 449.145C223.499 450.432 225.905 452.203 227.853 454.454L229.365 453.146ZM221.44 447.322C218.34 445.907 214.737 445.216 210.657 445.216V447.216C214.513 447.216 217.822 447.869 220.61 449.142L221.44 447.322ZM210.657 445.216C206.638 445.216 203.039 445.908 199.881 447.319L200.697 449.145C203.555 447.868 206.868 447.216 210.657 447.216V445.216ZM199.881 447.319C196.747 448.72 194.097 450.661 191.949 453.146L193.461 454.454C195.409 452.203 197.815 450.432 200.697 449.145L199.881 447.319ZM191.958 453.136C189.809 455.553 188.207 458.43 187.145 461.751L189.049 462.361C190.035 459.282 191.505 456.655 193.452 454.464L191.958 453.136ZM187.146 461.746C186.086 464.992 185.561 468.49 185.561 472.232H187.561C187.561 468.678 188.06 465.392 189.048 462.366L187.146 461.746ZM256.182 447.368H255.182V448.368H256.182V447.368ZM256.182 432.488H257.182V431.488H256.182V432.488ZM248.022 432.488V431.488H247.022V432.488H248.022ZM248.022 447.368V448.368H249.022V447.368H248.022ZM239.574 447.368V446.368H238.574V447.368H239.574ZM239.574 454.568H238.574V455.568H239.574V454.568ZM248.022 454.568H249.022V453.568H248.022V454.568ZM248.694 491.72L247.741 492.023L247.741 492.023L248.694 491.72ZM250.71 494.984L250.059 495.743L250.072 495.754L250.085 495.765L250.71 494.984ZM254.358 496.616L254.146 497.593L254.169 497.598L254.194 497.602L254.358 496.616ZM266.07 497V498H267.07V497H266.07ZM266.07 489.8H267.07V488.8H266.07V489.8ZM259.158 489.704L258.994 490.69L259.037 490.698L259.081 490.701L259.158 489.704ZM256.374 487.688L255.398 487.905L255.409 487.955L255.425 488.004L256.374 487.688ZM256.182 454.568V453.568H255.182V454.568H256.182ZM266.07 454.568V455.568H267.07V454.568H266.07ZM266.07 447.368H267.07V446.368H266.07V447.368ZM257.182 447.368V432.488H255.182V447.368H257.182ZM256.182 431.488H248.022V433.488H256.182V431.488ZM247.022 432.488V447.368H249.022V432.488H247.022ZM248.022 446.368H239.574V448.368H248.022V446.368ZM238.574 447.368V454.568H240.574V447.368H238.574ZM239.574 455.568H248.022V453.568H239.574V455.568ZM247.022 454.568V486.152H249.022V454.568H247.022ZM247.022 486.152C247.022 488.508 247.25 490.478 247.741 492.023L249.647 491.417C249.242 490.146 249.022 488.404 249.022 486.152H247.022ZM247.741 492.023C248.231 493.564 248.99 494.827 250.059 495.743L251.361 494.225C250.638 493.605 250.053 492.692 249.647 491.417L247.741 492.023ZM250.085 495.765C251.19 496.649 252.556 497.248 254.146 497.593L254.57 495.639C253.216 495.344 252.15 494.855 251.335 494.203L250.085 495.765ZM254.194 497.602C255.799 497.87 257.681 498 259.83 498V496C257.755 496 255.989 495.874 254.522 495.63L254.194 497.602ZM259.83 498H266.07V496H259.83V498ZM267.07 497V489.8H265.07V497H267.07ZM266.07 488.8H262.326V490.8H266.07V488.8ZM262.326 488.8C261.06 488.8 260.032 488.768 259.235 488.707L259.081 490.701C259.948 490.768 261.032 490.8 262.326 490.8V488.8ZM259.322 488.718C258.647 488.605 258.199 488.421 257.915 488.218L256.753 489.846C257.365 490.283 258.134 490.547 258.994 490.69L259.322 488.718ZM257.915 488.218C257.657 488.034 257.455 487.769 257.323 487.372L255.425 488.004C255.677 488.759 256.115 489.39 256.753 489.846L257.915 488.218ZM257.35 487.471C257.245 486.996 257.182 486.31 257.182 485.384H255.182C255.182 486.378 255.247 487.228 255.398 487.905L257.35 487.471ZM257.182 485.384V454.568H255.182V485.384H257.182ZM256.182 455.568H266.07V453.568H256.182V455.568ZM267.07 454.568V447.368H265.07V454.568H267.07ZM266.07 446.368H256.182V448.368H266.07V446.368ZM284.255 438.44V439.44H285.255V438.44H284.255ZM284.255 428.456H285.255V427.456H284.255V428.456ZM276.095 428.456V427.456H275.095V428.456H276.095ZM276.095 438.44H275.095V439.44H276.095V438.44ZM276.095 447.368V446.368H275.095V447.368H276.095ZM276.095 497H275.095V498H276.095V497ZM284.255 497V498H285.255V497H284.255ZM284.255 447.368H285.255V446.368H284.255V447.368ZM285.255 438.44V428.456H283.255V438.44H285.255ZM284.255 427.456H276.095V429.456H284.255V427.456ZM275.095 428.456V438.44H277.095V428.456H275.095ZM276.095 439.44H284.255V437.44H276.095V439.44ZM275.095 447.368V497H277.095V447.368H275.095ZM276.095 498H284.255V496H276.095V498ZM285.255 497V447.368H283.255V497H285.255ZM284.255 446.368H276.095V448.368H284.255V446.368ZM304.48 464.264L303.537 463.933L303.534 463.94L303.532 463.948L304.48 464.264ZM312.736 454.664L312.339 453.746L312.327 453.751L312.736 454.664ZM324.736 454.664L324.327 455.577L324.339 455.582L324.736 454.664ZM329.729 458.312L330.479 457.651L330.479 457.651L329.729 458.312ZM332.993 464.264L332.041 464.573L332.046 464.588L332.052 464.604L332.993 464.264ZM332.993 480.296L332.049 479.965L332.046 479.972L332.044 479.98L332.993 480.296ZM329.729 486.152L330.466 486.828L330.473 486.82L330.479 486.813L329.729 486.152ZM324.736 489.704L324.339 488.786L324.327 488.791L324.736 489.704ZM312.736 489.704L312.327 490.617L312.339 490.622L312.736 489.704ZM307.84 486.152L307.09 486.813L307.096 486.82L307.103 486.828L307.84 486.152ZM304.48 480.296L303.529 480.605L303.534 480.62L303.54 480.636L304.48 480.296ZM296.224 482.408L295.274 482.718L295.274 482.718L296.224 482.408ZM300.832 490.664L300.076 491.318L300.085 491.328L300.832 490.664ZM308.416 496.136L308.009 497.049L308.017 497.053L308.025 497.056L308.416 496.136ZM329.152 496.136L329.551 497.053L329.56 497.049L329.152 496.136ZM336.737 490.664L337.484 491.328L337.493 491.318L336.737 490.664ZM341.344 482.408L340.394 482.098L340.394 482.098L341.344 482.408ZM341.344 462.056L340.392 462.361L340.394 462.366L341.344 462.056ZM336.737 453.8L335.98 454.454L335.989 454.464L336.737 453.8ZM329.152 448.232L328.737 449.142L328.745 449.145L329.152 448.232ZM308.416 448.232L308.824 449.145L308.824 449.145L308.416 448.232ZM300.832 453.8L301.58 454.464L301.589 454.454L300.832 453.8ZM296.224 462.056L297.175 462.366L297.177 462.361L296.224 462.056ZM304.328 472.232C304.328 469.307 304.702 466.761 305.429 464.58L303.532 463.948C302.723 466.375 302.328 469.141 302.328 472.232H304.328ZM305.424 464.595C306.221 462.327 307.282 460.461 308.591 458.973L307.09 457.651C305.583 459.363 304.404 461.465 303.537 463.933L305.424 464.595ZM308.591 458.973C309.909 457.475 311.426 456.347 313.146 455.577L312.327 453.751C310.335 454.645 308.588 455.949 307.09 457.651L308.591 458.973ZM313.134 455.582C314.927 454.804 316.808 454.416 318.784 454.416V452.416C316.537 452.416 314.386 452.86 312.339 453.746L313.134 455.582ZM318.784 454.416C320.761 454.416 322.605 454.804 324.327 455.577L325.146 453.751C323.156 452.86 321.032 452.416 318.784 452.416V454.416ZM324.339 455.582C326.121 456.354 327.665 457.481 328.978 458.973L330.479 457.651C328.976 455.943 327.192 454.638 325.134 453.746L324.339 455.582ZM328.978 458.973C330.282 460.454 331.308 462.313 332.041 464.573L333.944 463.955C333.141 461.479 331.991 459.37 330.479 457.651L328.978 458.973ZM332.052 464.604C332.837 466.777 333.24 469.314 333.24 472.232H335.24C335.24 469.134 334.812 466.359 333.933 463.924L332.052 464.604ZM333.24 472.232C333.24 475.149 332.837 477.722 332.049 479.965L333.936 480.627C334.812 478.134 335.24 475.331 335.24 472.232H333.24ZM332.044 479.98C331.312 482.174 330.286 484.005 328.978 485.491L330.479 486.813C331.987 485.099 333.137 483.026 333.941 480.612L332.044 479.98ZM328.991 485.476C327.679 486.908 326.131 488.01 324.339 488.786L325.134 490.622C327.182 489.734 328.962 488.468 330.466 486.828L328.991 485.476ZM324.327 488.791C322.605 489.564 320.761 489.952 318.784 489.952V491.952C321.032 491.952 323.156 491.508 325.146 490.617L324.327 488.791ZM318.784 489.952C316.808 489.952 314.927 489.564 313.134 488.786L312.339 490.622C314.386 491.508 316.537 491.952 318.784 491.952V489.952ZM313.146 488.791C311.417 488.017 309.896 486.914 308.578 485.476L307.103 486.828C308.601 488.462 310.344 489.727 312.327 490.617L313.146 488.791ZM308.591 485.491C307.277 483.998 306.217 482.16 305.421 479.956L303.54 480.636C304.408 483.04 305.588 485.106 307.09 486.813L308.591 485.491ZM305.432 479.987C304.702 477.737 304.328 475.156 304.328 472.232H302.328C302.328 475.324 302.723 478.119 303.529 480.605L305.432 479.987ZM293.688 472.232C293.688 475.974 294.214 479.472 295.274 482.718L297.175 482.098C296.187 479.072 295.688 475.786 295.688 472.232H293.688ZM295.274 482.718C296.337 485.974 297.937 488.844 300.076 491.318L301.589 490.01C299.632 487.748 298.16 485.114 297.175 482.098L295.274 482.718ZM300.085 491.328C302.234 493.746 304.88 495.651 308.009 497.049L308.824 495.223C305.937 493.933 303.527 492.19 301.58 490L300.085 491.328ZM308.025 497.056C311.178 498.398 314.772 499.056 318.784 499.056V497.056C314.989 497.056 311.671 496.434 308.808 495.216L308.025 497.056ZM318.784 499.056C322.858 499.056 326.455 498.399 329.551 497.053L328.754 495.219C325.962 496.433 322.647 497.056 318.784 497.056V499.056ZM329.56 497.049C332.689 495.651 335.335 493.746 337.484 491.328L335.989 490C334.042 492.19 331.632 493.933 328.745 495.223L329.56 497.049ZM337.493 491.318C339.632 488.844 341.232 485.974 342.295 482.718L340.394 482.098C339.409 485.114 337.937 487.748 335.98 490.01L337.493 491.318ZM342.295 482.718C343.355 479.472 343.881 475.974 343.881 472.232H341.881C341.881 475.786 341.382 479.072 340.394 482.098L342.295 482.718ZM343.881 472.232C343.881 468.49 343.355 464.992 342.295 461.746L340.394 462.366C341.382 465.392 341.881 468.678 341.881 472.232H343.881ZM342.297 461.751C341.234 458.43 339.633 455.553 337.484 453.136L335.989 454.464C337.936 456.655 339.407 459.282 340.392 462.361L342.297 461.751ZM337.493 453.146C335.344 450.661 332.695 448.72 329.56 447.319L328.745 449.145C331.626 450.432 334.033 452.203 335.98 454.454L337.493 453.146ZM329.568 447.322C326.467 445.907 322.864 445.216 318.784 445.216V447.216C322.641 447.216 325.95 447.869 328.737 449.142L329.568 447.322ZM318.784 445.216C314.766 445.216 311.166 445.908 308.009 447.319L308.824 449.145C311.683 447.868 314.995 447.216 318.784 447.216V445.216ZM308.009 447.319C304.874 448.72 302.225 450.661 300.076 453.146L301.589 454.454C303.536 452.203 305.943 450.432 308.824 449.145L308.009 447.319ZM300.085 453.136C297.936 455.553 296.335 458.43 295.272 461.751L297.177 462.361C298.162 459.282 299.633 456.655 301.58 454.464L300.085 453.136ZM295.274 461.746C294.214 464.992 293.688 468.49 293.688 472.232H295.688C295.688 468.678 296.187 465.392 297.175 462.366L295.274 461.746ZM352.981 447.368V446.368H351.981V447.368H352.981ZM352.981 497H351.981V498H352.981V497ZM361.141 497V498H362.141V497H361.141ZM362.005 462.824L361.057 462.508L361.054 462.518L361.05 462.528L362.005 462.824ZM364.789 457.832L364.033 457.178L364.033 457.178L364.789 457.832ZM369.301 454.568L368.919 453.644L368.908 453.649L369.301 454.568ZM385.909 497H384.909V498H385.909V497ZM394.069 497V498H395.069V497H394.069ZM393.205 457.064L392.231 457.287L392.234 457.303L392.239 457.32L393.205 457.064ZM390.421 451.304L389.656 451.947L389.656 451.947L390.421 451.304ZM360.853 455.24V456.24H361.438L361.725 455.731L360.853 455.24ZM360.661 455.24H359.661V456.24H360.661V455.24ZM360.661 447.368H361.661V446.368H360.661V447.368ZM351.981 447.368V497H353.981V447.368H351.981ZM352.981 498H361.141V496H352.981V498ZM362.141 497V468.968H360.141V497H362.141ZM362.141 468.968C362.141 466.813 362.418 464.867 362.961 463.12L361.05 462.528C360.44 464.493 360.141 466.643 360.141 468.968H362.141ZM362.954 463.14C363.557 461.333 364.423 459.786 365.546 458.486L364.033 457.178C362.724 458.694 361.734 460.475 361.057 462.508L362.954 463.14ZM365.546 458.486C366.658 457.198 368.036 456.198 369.695 455.487L368.908 453.649C366.983 454.474 365.353 455.65 364.033 457.178L365.546 458.486ZM369.684 455.492C371.393 454.785 373.434 454.416 375.829 454.416V452.416C373.233 452.416 370.922 452.815 368.919 453.644L369.684 455.492ZM375.829 454.416C378.767 454.416 380.952 455.249 382.514 456.811L383.929 455.397C381.907 453.375 379.164 452.416 375.829 452.416V454.416ZM382.514 456.811C384.08 458.377 384.909 460.533 384.909 463.4H386.909C386.909 460.123 385.947 457.415 383.929 455.397L382.514 456.811ZM384.909 463.4V497H386.909V463.4H384.909ZM385.909 498H394.069V496H385.909V498ZM395.069 497V464.36H393.069V497H395.069ZM395.069 464.36C395.069 461.602 394.774 459.082 394.172 456.808L392.239 457.32C392.789 459.398 393.069 461.742 393.069 464.36H395.069ZM394.18 456.841C393.637 454.462 392.643 452.394 391.187 450.661L389.656 451.947C390.888 453.414 391.75 455.186 392.231 457.287L394.18 456.841ZM391.187 450.661C389.727 448.922 387.828 447.585 385.522 446.635L384.761 448.485C386.807 449.327 388.428 450.486 389.656 451.947L391.187 450.661ZM385.522 446.635C383.188 445.674 380.329 445.216 376.981 445.216V447.216C380.162 447.216 382.743 447.654 384.761 448.485L385.522 446.635ZM376.981 445.216C369.29 445.216 363.566 448.394 359.982 454.749L361.725 455.731C364.925 450.054 369.953 447.216 376.981 447.216V445.216ZM360.853 454.24H360.661V456.24H360.853V454.24ZM361.661 455.24V447.368H359.661V455.24H361.661ZM360.661 446.368H352.981V448.368H360.661V446.368Z'
               fill={color}
            />
         </g>
         <defs>
            <clipPath id='clip0_118_7'>
               <rect width='500' height='500' fill='white' />
            </clipPath>
            <clipPath id='clip1_118_7'>
               <rect
                  width='410'
                  height='410'
                  fill='white'
                  transform='translate(45)'
               />
            </clipPath>
         </defs>
      </svg>
   );
}

export default FramerMotionIcon;
