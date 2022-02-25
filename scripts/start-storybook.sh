clientName=${1}
storybookPath=clients/${clientName}/.storybook

shift

GREY="\033[1;30m"
NC='\033[0m'

if [ ! -d "$storybookPath" ]; then
  echo "[storybook] $storybookPath does not exist"
  exit 1
fi

echo "${GREY}yarn start-storybook -c $storybookPath $@${NC}"

yarn start-storybook -c $storybookPath -p 6006 $@
