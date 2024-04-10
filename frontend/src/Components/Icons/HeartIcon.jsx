import React from "react";
import PropTypes from "prop-types";

const HeartIcon = ({ some }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2996 1.29883C10.7259 1.29883 10.158 1.41184 9.62803 1.63142C9.09816 1.85097 8.61662 2.17288 8.21113 2.57852L7.99956 2.7901L7.78787 2.5784C6.9688 1.75933 5.8579 1.29918 4.69956 1.29918C3.54122 1.29918 2.43032 1.75933 1.61125 2.5784C0.79218 3.39747 0.332031 4.50837 0.332031 5.66671C0.332031 6.82505 0.79218 7.93595 1.61125 8.75502L7.50458 14.6484C7.77795 14.9217 8.22117 14.9217 8.49453 14.6484L14.3879 8.75502C14.7935 8.34953 15.1153 7.86811 15.3349 7.33824C15.5544 6.80831 15.6674 6.24032 15.6674 5.66671C15.6674 5.0931 15.5544 4.52511 15.3349 3.99519C15.1153 3.46537 14.7936 2.98398 14.388 2.57852C13.9825 2.17282 13.501 1.85099 12.9711 1.63142C12.4412 1.41184 11.8732 1.29883 11.2996 1.29883Z"
        fill={some ? `red` : `white`}
      />
    </svg>
  );
};
HeartIcon.propTypes = {
  some: PropTypes.bool.isRequired,
};

export default React.memo(HeartIcon);
