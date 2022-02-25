clientPath=$1
configPath=clients/${clientPath}/jest.config.ts

shift

GREY="\033[1;30m"
NC='\033[0m'

if [ ! -f "$configPath" ]; then
  echo "[test] $configPath does not exist"
  exit 1
fi

cmd="yarn run jest --passWithNoTests -c $configPath $@"

echo "${GREY}$cmd${NC}"

$cmd
