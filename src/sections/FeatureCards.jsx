const FeatureCards = () => (
  <div className="w-full padding-x-lg">
    <div className="mx-auto grid-2-cols">
      {/* LeetCode Card */}
      <div className="card-border rounded-xl p-4 flex flex-col gap-2">
        
        <h3 className="text-white text-xl font-semibold mt-1">LeetCode Stats</h3>
        <div className="text-white-50">
          <img
            src="https://leetcard.jacoblin.cool/haryiank?theme=dark&font=Karma&ext=heatmap"
            alt="LeetCode Stats"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* GitHub Stats Card */}
      <div className="card-border rounded-xl p-4 flex flex-col gap-2">
        
        
        <h3 className="text-white text-xl font-semibold mt-1">GitHub Stats</h3>
        <div className="text-white-50">
          <img
            src="https://github-readme-stats.vercel.app/api?username=haryiankkumra&show_icons=true&theme=dark&count_private=true"
            alt="GitHub Stats"
            className="w-full rounded-lg mb-2"
          />
          {/* <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=anuraghazra&layout=compact&theme=dark"
            alt="Top Languages"
            className="w-full rounded-lg"
          /> */}
        </div>
      </div>
    </div>
  </div>
);

export default FeatureCards;